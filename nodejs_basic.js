
/*

█▀ ▀█▀ █▀█ █▀▀ ▄▀█ █▀▄▀█ █▀
▄█ ░█░ █▀▄ ██▄ █▀█ █░▀░█ ▄█
*/
/*
There are three types of streams in Node: 
1) readable (stdin, file)
2) writable (stdout, file)
3) duplex (HTTP, TCP)

What makes streams unique, is that instead of a program reading
a file into memory all at once like in the traditional way, streams read chunks of data piece by piece, processing its content 
without keeping it all in memory.
*/

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

  _read() {
    if(this.index > this.array.length){
        this.push(null);
    }
    const chunk = this.array[this.index];
    this.push(chunk);
    this.index += 1;
  }

}

const adviceStream = new StreamFromArray(advices);

adviceStream.on('data',(chunk)=>console.log(chunk.toString('utf-8')))
adviceStream.on('end',()=>console.log('done!'));
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

/*When we want to direct a readable stream to writable - we can use a previous example (snippet 4).
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





