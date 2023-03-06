
/***** libuv eventLoop in nodejs  ****/

/*

█▀ ▀█▀ █▀█ █▀▀ ▄▀█ █▀▄▀█ █▀
▄█ ░█░ █▀▄ ██▄ █▀█ █░▀░█ ▄█
*/
//realise own:
////https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/
/*Writable streams use the eventemitteer API list of events:
 "error" - when there is a write error;
 "drain" - When the internal buffer of the stream reaches the HighWaterMark,
          The method .write() returns FALSE.It means that the internal buffer is full.
          The stream is ready for use once the data from this buffer has been consumed
          and the "drain" event emitted.
          
   how to create custom redable/writable streams:   
   https://nodejs.org/api/stream.html#api-for-stream-implementers
   about the backpressure problem:
 https://nodejs.org/en/docs/guides/backpressuring-in-streams/?utm_source=thenewstack&utm_medium=website&utm_content=inline-mention&utm_campaign=platform
 
**/


/*
There are three types of streams in Node: 
1) readable (stdin, file)
2) writable (stdout, file)
3) duplex (HTTP, TCP)

What makes streams unique, is that instead of a program reading
a file into memory all at once like in the traditional way, streams read chunks of data piece by piece, processing its content 
without keeping it all in memory.
*/
/***s n i p e t 0.1) a readable stream using an instance of 'Readable'*/
  const stream = require('stream')
  
 class myReadableClass extends stream.Readable{
  constructor(bf){
   //call a constructor of parent class
    super({highWaterMark:65000});
   //assign buffer 
    this._myBuffer = bf;
   //set index pointer
    this._count = 0; 
  }
    //this callback function must be implemented by user
  _read(size){
   //has an end of buffer been achived?
    if (this._count > this._myBuffer.length) {
     ///when yes - send NULL and close the stream
      this.push(null);
      return;
    }
   //send a slice of the buffer
    this.push(this._myBuffer.subarray(this._count, this._count + size));
   //increase index pointer
    this._count += size; 
  }
}

let mystream = new myReadamleClass(Buffer.from([0x21x0x22,0x23,0x24]));
mystream.pipe(process.stdout);

//----an another example with backpressure control--------------------
const fs = require('fs');
const stream = require('stream');
const crypto = require('crypto');
const util = require('util');

class MyReadStream extends stream.Readable{

    constructor(par){
        super(par);
        this.amount = 0;
    }

   async _read () {
        if (this.amount > 1000000){
            this.push(null);
            return;
        }
        let rb = util.promisify(crypto.randomBytes);
        let chunk = await rb(100);
        chunk.toString('hex');
        if (! this.push(chunk)){
         //when there in a backpressure on writable - wait until 'drain'
            this.pause();
        }
        this.amount += 1;
    }

}

let filereadable = fs.createReadStream('./big.file', {highWaterMark:10000});
//filereadable.on('drain', ()=>read.resume());

let write = new fs.createWriteStream('./another.file',{flags:'a',highWaterMark:1000})
let read = new MyReadStream({highWaterMark: 16000});

//filereadable.pipe(write);

read.pipe(write);

/**** s n i p p e t  1) readable stream */
  //export 'Readable'
const {Readable} = require("stream");
  //Define an array 
const advices = [
    'George Washington',
    'John Adams',
    'Thomas Jefferson',
    'James Madison',
    'James Monroe',
    'John Quincy Adams',
    'Andrew Jackson',
    'Martin Van Buren',
    'William Henry Harrison',
    'John Tyler',
    'James K. Polk',
    'Zachary Taylor',
    'Millard Fillmore',
    'James Buchanan',
    'Abraham Lincoln',
    'Andrew Johnson',
   ' Ulysses S. Grant',
   'Rutherford B. Hayes',
   'James A. Garfield'
];

//define a class
class StreamFromArray extends Readable {
  constructor (array ) {
    super();
    this.array = array;
    this.index = 0
  }
   /***********read() - is required and is called automatically when new data is wanted.****/
  _read() {
     if (this.index > this.array.length) {
         this.push(null);
     }
    const chunk = this.array[this.index];
    /****Calling push() will cause the data to go into an internal buffer, and it will be 
     consumed when something, like a piped writable stream, wants it.****/
    this.push(chunk);
    this.index += 1;
  }

}

const adviceStream = new StreamFromArray(advices);

adviceStream.on('data',(chunk)=>console.log(chunk.toString('utf-8')))
adviceStream.on('end',()=>console.log('done!'));
///******s n i p p e t    1.1
//------------------------------------------------------------
/*** s n i p p e t   2 ****  readable from  file to stdout ***/

const fs = require('fs');
const readStream = fs.createReadStream('./bigfile');
  //when a next portion of data is ready to use:
readStream.on('data', (chunk)=>{
    console.log( 'little chunk \n');
    console.log(chunk);
})
  //when all the data from a strean has beed reading: 
readStream.on('end', ()=>{
    console.log(" END of the stream: \n");
})
 //when there an error occured:
readStream.on('error', (e)=>{
    console.log(  " ERROR:  ", e);
})

//--------------------------------------------------------
 /****** s n i p p e t 3  writable & readable ******/

const fs = require("fs");

const readStream = fs.createReadStream('./bigfile');
const writeStream = fs.createWriteStream('./bigfile.copy');


readStream.on('data',(chunk)=>{
  //when a new portion of data has been arrived from a 'readable' - write in into 'writable' 
    writeStream.write(chunk);
});

readStream.on('error',(err)=>{
    console.log("\x1b[31m", 'Error reading:', err);
    console.log("\x1b[37m");
})

readStream.on('end',()=>{
  //when there is no data to read - close a writable stream
    writeStream.end();
    console.log('Done!');
});

writeStream.on('close',()=>{
    console.log("\x1b[33m",'Write Done!');
    console.log("\x1b[37m");
})



/**********  s n i p p e t  4    - backpressure ********* ! please see snipppet 5*/
/**When a writable stream has less bandwith that readable - there may by overflow.
It leads to consume extra memory. To prevent it - stop readable stream and resume when a
 writable has been writing a regular chunk of data.
 
 Both Writable and Readable streams will store data in an internal buffer.

The amount of data potentially buffered depends on the highWaterMark option passed 
into the stream's constructor. For normal streams, 
the highWaterMark option specifies a total number of bytes.
For streams operating in object mode, the highWaterMark specifies 
a total number of objects.*/
/*
when the buffer on Wriitable side is full (when we call .write() on Readable - it returns null) - there Readable must stop until
tthe Writable emits "drain".
*/
const readStream = fs.createReadStream('./bigfile');
const writeStream = fs.createWriteStream('./bigfile.copy', {
                                                           highWaterMark: 1000000, 
                                                            });
let sw = false;
readStream.on('data',(chunk)=>{
   const result =  writeStream.write(chunk);
    //when there is "backpressure" - stop readable stream
    if(!result) {
        console.log(colors.red,'backpressure!')
        console.log(colors.white);
      ///stop readable stream
        readStream.pause();
    }    
});

readStream.on('error',(err)=>{
    console.log(colors.red, 'Error reading:', err);
    console.log(colors.white);
})

readStream.on('end',()=>{
    writeStream.end();
    console.log('Done!');
});

writeStream.on('close',()=>{
    console.log(colors.green,'Write Done!');
    console.log(colors.white);
})
//when a regular chunk of data has been written (and writable is ready)
writeStream.on('drain', ()=>{
    console.log(colors.green,'drained!');
    console.log(colors.white);
   ///resume readable string - reading data again
    readStream.resume();
})

/**** s n i p p e t  5.  The  pipe()  method***/

/* Returns: <stream.Writable>.
     When we want to direct a readable stream to writable - we can use a previous example (snippet 4).
The same thig does the pipe() method - it allows direct a readable stream to writable.NO need to 
 care about error handling, backpressure.All this things does the pipe() method*/
/*However, using .pipe() in production applications (for multiple streams) is not recommended for several reasons. 
If one of the piped streams is closed or throws an error, pipe() will not automatically destroy the
connected streams. This can cause memory leaks in applications. Also, pipe() does not automatically 
forward errors across streams to be handled in one place.
pipeline() was introduced to cater for these problems, so it's recommended you use pipeline() instead 
of pipe() to connect multiple streams.*/

const readStream = fs.createReadStream('./bigfile',{highWaterMark:10000});
const writeStream = fs.createWriteStream('./bigfile.copy', {
                                                           highWaterMark: 10000, /*how max amount of memory (in bytes) can we use for a stream*/
                                                            });
//create a pipe and add an error listener
readStream.pipe(writeStream).on('error',(e)=>{console.log(e)});

/// T R A N S F O R M     stream 
class MyTransformStream extends stream.Transform {
    constructor(par) {
        super();
    }

    _transform(chunk, encoding, callback) {
        let result = chunk.toString("utf-8");
        callback( null, result.toUpperCase())
        
    }

}

/***********UPLOAD file**
Uploading file from web-browser using streams*****/
/***server side -  parameters (req, res)***/
//1) create readable stream - a filename is in a POST headers
let wr = fs.createWriteStream(req.headers['file-name']);
   
//2) adding event listener - when all the data has been consumed
 req.on('end',()=>{
     res.statusCode = 201;
     res.setHeader('content-type','text/plain,charset=utf-8');
     res.end(`Resource ${req.headers['file-name']} Created!`);
 })

 //3) pipe a filedata into a disk
    req.pipe(wr)
 /****client side - html ***/
<input class="form-control" type="file" id="myFileInput">
<button type="button" class="btn btn-primary m-2">Upload..</button>
<script>
  let btn = document.querySelector(".btn");
  btn.addEventListener('click',uploadFile);

  async function uploadFile () {
 let input = document.getElementById('myFileInput').files[0];
    let myReader = new FileReader();
      //start reading a file
    myReader.readAsArrayBuffer(input);
    myReader.addEventListener('load', async ()=>{
     
        //push to the server
        let result = await  fetch('https://192.168.1.113/',{
            method:'POST',
            headers:{
                'file-name':input.name,
                'content-length':myReader.result.byteLength,
            },

            body:myReader.result
        })
        result = await result.text(); 
        document.querySelector('.textout').innerText = result
        console.log(result);
    })
  
  }
    




