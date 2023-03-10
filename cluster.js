
https://blog.logrocket.com/optimizing-node-js-app-performance-clustering/

/***clustering may help increase performance when we have concurrent requests: for example we have heavy 
calculations that can blocking eventloop. For example heavy math calculations , cryptography.
In case of using external library (when author isn`t you and you don`t know -
what`s inside) - using of cluster may not be efficient and therefore MUST tests by loadtester****/

/*** The main process manage input requests and stream them into slave processes. Each slave process
has it`s own JS V8 engine, event loop and memory****/

/*******app.js*****************************/

const cluster = require("cluster");
const crypto = require('crypto');
const http = require('http')

const totalCPUs = require("os").cpus().length;
//when a master process - start slaves
if (cluster.isMaster) {
    console.log("\x1b[35m", `total CPU:${totalCPUs}`, "\x1b[0m");
    
    console.log(`Master ${process.pid} is running`);
   
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }
   
    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    
    //main js code - it will be have each slave process
    let server = http.createServer(onReq);
    async function onReq(req, res){
         let x1, y1;
      //do something heavy for CPU
          for(let d = 0; d <1000; d++){
            x1 = crypto.randomBytes(32);
            const hmac = crypto.createHmac('sha256', 'a secret');
             hmac.update(x1);
            hmac.digest('hex')
          }
        res.statusCode = 200;
       res.setHeader('Content-Type','text/plain,charset=utf-8');
        res.setHeader('Server','Muravey/0.0/unix');
        res.setHeader('Server','Wolf1.0/unix');
        res.end('Done!');
      
    }
  }
