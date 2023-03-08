
/*
When we have a heavy CPU calculations (image resizing, math calculations, encryption) - the main event loop in the engine waiting until the operation complete.
When clients are sending requests concurrently (when the first request haven`t been processed - arrive a new one) - the performance may suffer.
There avaliable to create an additional thread for execution heavy CPU operations. Workers (threads) are useful for performing CPU-intensive JavaScript operations. 
They DO NOT HELP MUCH with I/O-intensive work. The Node.js built-in asynchronous I/O operations are more efficient than Workers can be.
However, Node.js itself is a multi-threaded application. This is evident when you use one of the standard library's asynchronous methods to perform I/O operations, 
such as reading a file or making a network request. These tasks are delegated to a separate pool of threads
that Node creates and maintains using the libuv C library.
Although it feels like multi-threading, it's still possible for async functions to block the main event loop.
*/

/*********FILE: worker.js***/
const {parentPort} = require('worker_threads');

 //A) when main thread sending a mseeage, it is processed here:
parentPort.on('message', (number)=>{
    let result = heavyCalc(number);
    parentPort.postMessage(result);
})

 //B) do something heavy for the CPU
const heavyCalc =   (number) => {
let k = 1
 for (let y=0; y< 10000000; y++) {
  k =  Math.sin( Math.random());

 }
 return (k * 10000) | 0;
}

/*******FILE:  app.js******/
const fs = require('fs');
const http = require('http');
const { Worker } = require('worker_threads');

let workerScript = fs.readFileSync('./factorial.js',{encoding:'utf-8'});
let server  = http.createServer(onReq);

//D) request process routine 
async function onReq (req, res) {
  ///get searched params and path (optional)
    let incomingUrl = new URL(`http://localhost${req.url}`);
    let subpath = incomingUrl.pathname;
    let param = incomingUrl.searchParams.get('number');
  if(param) {
    //E) initialization from RAM - if you want you can read a script from disk  
    const factorialWorker = new Worker(workerScript,{eval:true});
      res.statusCode = 200;
      res.setHeader('content-type','text/json,charset=utf-8');
      //F) post data to the worker and runs the one:          
      factorialWorker.postMessage(param);
        param = await  new Promise((resolve, reject) => {
          //G) when the task has been completed and data returned from the worker:
          factorialWorker.on('message',(message)=>{
              resolve(message)
          })
        });
      //E) respond with worker`s data:
      res.end(JSON.stringify({parameter: param, date:new Date().toLocaleTimeString()}));
  } else {
   //when bad request....
  }
  
}


server.listen(8080);
