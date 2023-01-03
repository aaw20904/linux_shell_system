
/********STREAMS*******/
/*
There are three types of streams in Node: 
1) readable (stdin, file)
2) writable (stdout, file)
3) duplex (HTTP, TCP)

What makes streams unique, is that instead of a program reading
a file into memory all at once like in the traditional way, streams read chunks of data piece by piece, processing its content 
without keeping it all in memory.
*/

/**** SNIPPET 1) readable stream */
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
