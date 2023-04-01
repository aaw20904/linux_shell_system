/**when a new request arrives in Express - it can 
be processing by Middleware functions***/

/**...by the express.use() method: **/
let app = express();
app.use(myMiddleware1);
app.use(myMiddleware2);

function myMiddleware1(req, resp, next){
 console.log(req.url);
  next();
}


function myMiddleware2(req, resp, next){
 console.log(req.url);
  next();
}

app.get('/',(req,res)=>{
  res.send("<h2>helloword</h2>");
});

/**..by the adding to the route**/

let app = express();

function myMiddleware1(req, resp, next){
 console.log(req.url);
  next();
}

app.get('/', myMiddleware1, myMiddleware2, (req,res)=>{
  res.send("<h2>helloword</h2>");
});

/***when there was an exception during execution - it must be handled, because it
leads to crash an express application. For example - it`s an error simulation:***/

let app = express();
app.use(myMiddleware1);
app.use(myMiddleware2);

function myMiddleware1(req, resp, next){
  console.log(req.url);
  next(new Error("It`s an error!"));
}

function myMiddleware2(req, resp, next){
  console.log(req.url);
  next();
}

app.get('/',(req,res)=>{
  res.send("<h2>helloword</h2>");
});

/***to fix it there must be an error handler: ***/
  //catching:
app.use(errorHandler);
  //processing:
function errorHandler (err, req, res, next) {
  if (err) {
    res.send('<h1>there was an error!</h1>');
  }
}
