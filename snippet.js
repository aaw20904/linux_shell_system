/******https://connectreport.com/blog/tuning-http-keep-alive-in-node-js/


█ █▀▄▀█ █▀█ █▀█ █▀█ ▀█▀   ░░▄▀   █▀▀ ▀▄▀ █▀█ █▀█ █▀█ ▀█▀   █▄░█ █▀█ █▀▄ █▀▀ ░░█ █▀
█ █░▀░█ █▀▀ █▄█ █▀▄ ░█░   ▄▀░░   ██▄ █░█ █▀▀ █▄█ █▀▄ ░█░   █░▀█ █▄█ █▄▀ ██▄ █▄█ ▄█
****/

usefull modules: 'concat-stream'  'body'  in npm-js


//lib.js:
  module.exports = class MyClass {
	constructor(){
	console.log('HelloExport!');	
	}
	  
  }
  //main.js:
  const MyClass= require('lib.js');
  let instance = new MyClass();

/*
https://auth0.com/blog/developing-real-time-web-applications-with-server-sent-events/**/

/************

█░█░█ █▀▀ █▄▄ █▀ █▀█ █▀▀ █▄▀ █▀▀ ▀█▀
▀▄▀▄▀ ██▄ █▄█ ▄█ █▄█ █▄▄ █░█ ██▄ ░█░
***************/

/*The WebSocket.bufferedAmount read-only property returns the number of bytes of data that have been queued using calls to send() but not yet transmitted to the network.
This value resets to zero once all queued data has been sent. 
This value does not reset to zero when the connection is closed; if you keep calling send(), this will continue to climb. */
/*

█░█ █▀▀ █░░ █▀▄▀█ █▀▀ ▀█▀   █▀▀ █▀ █▀█
█▀█ ██▄ █▄▄ █░▀░█ ██▄ ░█░   █▄▄ ▄█ █▀▀
/*
*/
app.use(  //add helmet as a middleware
  helmet({ 
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
	      /*fonts...*/
        fontSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1", 
                    "https://maxcdn.bootstrapcdn.com", 
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "https://fonts.gstatic.com",
                    "https://fonts.googleapis.com"
                  ],
       /* styles ; unsafe-inline means that allows to download an any resource from domain
         ,for example: instead of "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	  you can write "https://cdn.jsdelivr.net" with "'unsafe-inline'", */
	      
        styleSrc: [ "'self'", "'unsafe-inline'",
                    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
                    "https://cdn.jsdelivr.net",
                    "https://cdnjs.cloudflare.com",
                    "https://maxcdn.bootstrapcdn.com",
                    "https://fonts.googleapis.com/css"
                   ],

        scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js",
                        "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/"
                   ],

        imgSrc: ["'self'", "https://mdbcdn.b-cdn.net"],

                 
        
        // Add other directives as needed
      },
    },
  })

█▄▄ ▄▀█ █░░ ▄▀█ █▄░█ █▀▀ █ █▄░█ █▀▀   █░█░█ █▀▀ █▄▄ █▀ █▀█ █▀▀ █▄▀ █▀▀ ▀█▀ █▀
█▄█ █▀█ █▄▄ █▀█ █░▀█ █▄▄ █ █░▀█ █▄█   ▀▄▀▄▀ ██▄ █▄█ ▄█ █▄█ █▄▄ █░█ ██▄ ░█░ ▄█
https://tsh.io/blog/how-to-scale-websocket/
***************/
//https://www.section.io/engineering-education/job-scheduling-in-nodejs/
////https://yudhajitadhikary.medium.com/creating-chat-application-using-express-and-websockets-ed567339c4d5
//crush curse protocol websocket nodejs https://www.youtube.com/watch?v=qFoFKLI3O8w

/*******

█░█ ▀█▀ ▀█▀ █▀█ █▀   █▀▀ ▀▄▀ █▀█ █▀█ █▀▀ █▀ █▀ ░░█ █▀     ▄█▄   █▀ ▀█▀ ▄▀█ ▀█▀ █ █▀▀   █▀▀ █▀█ █▄░█ ▀█▀ █▀▀ █▄░█ ▀█▀
█▀█ ░█░ ░█░ █▀▀ ▄█   ██▄ █░█ █▀▀ █▀▄ ██▄ ▄█ ▄█ █▄█ ▄█     ░▀░   ▄█ ░█░ █▀█ ░█░ █ █▄▄   █▄▄ █▄█ █░▀█ ░█░ ██▄ █░▀█ ░█░

█░█ █▀▀ ▄▀█ █▀▄ █▀▀ █▀█
█▀█ ██▄ █▀█ █▄▀ ██▄ █▀▄
**************************/
const https = require('https');
const fs = require('fs');
const serveStatic = require("serve-static");


const options = {
  key: fs.readFileSync('./https.key'),
  cert: fs.readFileSync('./https.cert'),
  rejectUnauthorized:false
};


const setCustomCacheControl = (res, path) => {
  if (serveStatic.mime.lookup(path) === "text/html") {
    res.setHeader("Service-Worker-allowed", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
};

app.use(
  serveStatic(path.join(__dirname, "public"), {
    setHeaders: setCustomCacheControl,
  })
);

app.use(express.static('public'));

https.createServer(options, app).listen(3000,()=>console.log('listen on :3000...'));
//------------------------------####-----------------------------------------
/*********NODE JS Promise-based FETCH function content from the
 * remote server (for example https://google.com) */
const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};



/***********

█▄▄ ▄▀█ █▀▀ █▄▀ █▀▀ █▄░█ █▀▄   █▀▀ ▀▄▀ █▀█ █▀█ █▀▀ █▀ █▀ ░░▄▀ █▀▄▀█ █▄█ █▀ █▀█ █░░ ░░▄▀ █▀▀ ▀▄▀ █▀█ █▀█ █▀▀ █▀ █▀
█▄█ █▀█ █▄▄ █░█ ██▄ █░▀█ █▄▀   ██▄ █░█ █▀▀ █▀▄ ██▄ ▄█ ▄█ ▄▀░░ █░▀░█ ░█░ ▄█ ▀▀█ █▄▄ ▄▀░░ ██▄ █░█ █▀▀ █▀▄ ██▄ ▄█ ▄█
******S N I P P E T S************/
/****To create a new table - write column names in `  ` quotes.
  To makin a request - use " " quotes**/
 /*MySQL
 conecting
  multiple queries
*/
const mongoose = require('mongoose');//
require('dotenv').config(); //support .env file -> process.env. 
const express = require('express');  //express
const jsonwebtoken = require('jsonwebtoken');//JWT
const fs = require('fs'); //filesystem
const mysql = require('mysql2'); //database mamnagement system MySQL
const app = express(); //instance of an application
const path = require('path'); //file path in any OS
const bcrypt = require('bcrypt'); //hash functions
const crypto = require('crypto'); //cryptography - generate key pairs, encrypt/ decrypt / randomBytes()
const jwt = require('jsonwebtoken'); //

/*SUPPORT JSON reading from the request`s body*/
app.use(express.json());

//// 1. Create MySQL Connection

const connectionDB = mysql.createConnection({
  user: 'root',
  password: '65535258',
  host: 'localhost',
  database: 'myrouter',
  //optional - if here a secret connection*/
  ssl:{
	  ca: fs.readFileSync(...),
	  /*You can also connect to a MySQL server
	  without properly providing the appropriate CA to trust.
	  You should not do this.*/
	  rejectUnauthorized: FALSE,
  }
	  
  
});

/// 1.1 checking - has an error been happened?

connectionDB.connect(function(err) {
  if (err) {
	  //handle an error
    console.error('error connecting: ' + err.stack);
    return;
  }
}
/// 2 Make SQL query (Promise -style)
 
       conn.query('SELECT* FROM users_keys',(err,rows)=>{
           if(err) {
            /*if it`s inside a Promise*/   reject(err);
           } else{
             /*if it`s inside a Promise*/  resolve(rows);
           }
       })
	   
///3 SQL qery with several (or one) queries 
     let name1 = "cat";
	 let name2 = "dog";
	 let data1 = Buffer.from('92A8B9C011223344557788','hex');
	 let data2 = Buffer.from('12B8B75411223344557788','hex');
	 /*NOTE the cell data in the table have a BLOB type.See documentation MYSQL*/
     return new Promise((resolve,reject)=>{
		         
        values=[
                  [name1, value1], [name2, value2]
        ];
        conn.query('INSERT INTO users_keys (name, data) VALUES ?',[values],(err,rows)=>{
            if(err){/*if it`s inside a Promise*/reject(err) }
            else{/*if it`s inside a Promise*/resolve(err)}
        })
    })
	/****************mySQL -  UPDATE a table cells*/
async changeAllTheUserDataDB (x={usrId,name,privateKey,publicKey,hashedPassword,sessionState,}, tableName) {
        
        return new Promise( (resolve, reject)=>{
           
            const command = `UPDATE ${tableName} SET name = ?, privateKey = ? WHERE usrId = '${x.usrId}'`
            this.DBconn.query(command, [x.name, x.privateKey], (err,rows)=>{
                if (err) { 
                    reject(err)
                }
                    resolve(rows)
               
            })
       });
    }	
	/**an another example*/
	 async setSession (usrId, sessionId,tablename){
        let mysql = this.data.get(this).connDB;
        return new Promise((resolve,reject)=>{
            const myData = [[sessionId]];
            mysql.query(`UPDATE  ${tablename} SET sessionId=?  WHERE usrId='${usrId}'`, myData, (err,rows)=>{
                if (err) {
                    reject(err);
                }
              //  if (rows.length == 1) {
                    resolve(rows);
              //  } else {
                    resolve(false);
              //  }
            })
        })
    }

/*

*/
	
	/****OPEN SSL*** generate self-signed cert*/
	
	openssl req -nodes -new -x509 -keyout server.key -out server.cert
	/**** 
	
▄█ ░   █▀▀   █▀█   █▄█   █▀█   ▀█▀   █▀█
░█ ▄   █▄▄   █▀▄   ░█░   █▀▀   ░█░   █▄█
	**********/
    /*creating a asymmetric key pair*/
   async function makeKeyPair () {
  return new Promise ((resolve,reject)=>{
    const crypto = require('crypto');

        const RSA = 'rsa';

        const passphrase = 'x512'; //an optionl password

        let options = {

            modulusLength: 1024 * 2, //standard length
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            }

        };


        let myCallback = (err, publicKey, privateKey) => {

            if (!err) {
                ////R E T U R N r e s u l t s
                
                resolve({privateKey:privateKey, publicKey:publicKey});  
            } else {
                reject(err);
            }

        };

        crypto.generateKeyPair(RSA, options, myCallback);

    })
}

/*

█▀▀ █▀▀▄ █▀▀ █▀▀█ █──█ █▀▀█ ▀▀█▀▀ 　 █──█ █▀▀ ─▀─ █▀▀▄ █▀▀▀ 　 ░█▀▀█ ░█─░█ ░█▀▀█ ░█─── ▀█▀ ░█▀▀█ ░█─▄▀ ░█▀▀▀ ░█──░█ 
█▀▀ █──█ █── █▄▄▀ █▄▄█ █──█ ──█── 　 █──█ ▀▀█ ▀█▀ █──█ █─▀█ 　 ░█▄▄█ ░█─░█ ░█▀▀▄ ░█─── ░█─ ░█─── ░█▀▄─ ░█▀▀▀ ░█▄▄▄█ 
▀▀▀ ▀──▀ ▀▀▀ ▀─▀▀ ▄▄▄█ █▀▀▀ ──▀── 　 ─▀▀▀ ▀▀▀ ▀▀▀ ▀──▀ ▀▀▀▀ 　 ░█─── ─▀▄▄▀ ░█▄▄█ ░█▄▄█ ▄█▄ ░█▄▄█ ░█─░█ ░█▄▄▄ ──░█──
*/

	/***encrypt using PUBLIC_KEY *****/
	
	/////E N C R Y P T @data must be a Buffer, RETURN - Buffer//////
function encryptToken (data, pubKey, password) {
    

    const encryptedData = crypto.publicEncrypt(
        {
			passphrase: password,
            key: pubKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",

        },
        // We convert the data string to a buffer using `Buffer.from`
        data
    );

    // The encrypted data is in the form of bytes, so we print it in base64 format
    // so that it's displayed in a more readable form
    return encryptedData;
}

/*

█▀▀▄ █▀▀ █▀▀ █▀▀█ █──█ █▀▀█ ▀▀█▀▀ 　 █──█ █▀▀ ─▀─ █▀▀▄ █▀▀▀ 　 █▀▀█ █▀▀█ ─▀─ ▀█─█▀ █▀▀█ ▀▀█▀▀ █▀▀ 　 █─█ █▀▀ █──█ 
█──█ █▀▀ █── █▄▄▀ █▄▄█ █──█ ──█── 　 █──█ ▀▀█ ▀█▀ █──█ █─▀█ 　 █──█ █▄▄▀ ▀█▀ ─█▄█─ █▄▄█ ──█── █▀▀ 　 █▀▄ █▀▀ █▄▄█ 
▀▀▀─ ▀▀▀ ▀▀▀ ▀─▀▀ ▄▄▄█ █▀▀▀ ──▀── 　 ─▀▀▀ ▀▀▀ ▀▀▀ ▀──▀ ▀▀▀▀ 　 █▀▀▀ ▀─▀▀ ▀▀▀ ──▀── ▀──▀ ──▀── ▀▀▀ 　 ▀─▀ ▀▀▀ ▄▄▄█*/
/**decrypt using private key**/
//////D E C R Y P T  @data type must be a 'Buffer' , RETURN - Buffer  ///
function decryptToken (data, privkey, password) {
    const decryptedData = crypto.privateDecrypt(
        {
          key: keyPair.priv_key,
          passphrase:password,
          // In order to decrypt the data, we need to specify the
          // same hashing function and padding scheme that we used to
          // encrypt the data in the previous step
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        data
      );
      
      // The decrypted data is of the Buffer type, which we can convert to a
      // string to reveal the original data
     return decryptedData;

}
/*
█▀█ ▄▀█ █▄░█ █▀▄ █▀█ █▀▄▀█   █▄░█ █░█ █▀▄▀█ █▄▄ █▀▀ █▀█   █▀▀ █▀▀ █▄░█ █▀▀ █▀█ ▄▀█ ▀█▀ █ █▄░█ █▀▀
█▀▄ █▀█ █░▀█ █▄▀ █▄█ █░▀░█   █░▀█ █▄█ █░▀░█ █▄█ ██▄ █▀▄   █▄█ ██▄ █░▀█ ██▄ █▀▄ █▀█ ░█░ █ █░▀█ █▄█*/
/****random bytes - symmetric key --**/
crypto.randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

///syncronous
const {
  randomBytes
} = await import('crypto');

/*

░█─░█ 　 ─█▀▀█ 　 ░█▀▀▀█ 　 ░█─░█ 　 ▀█▀ 　 ░█▄─░█ 　 ░█▀▀█ 
░█▀▀█ 　 ░█▄▄█ 　 ─▀▀▀▄▄ 　 ░█▀▀█ 　 ░█─ 　 ░█░█░█ 　 ░█─▄▄ 
░█─░█ 　 ░█─░█ 　 ░█▄▄▄█ 　 ░█─░█ 　 ▄█▄ 　 ░█──▀█ 　 ░█▄▄█
*/
////3 hash**********************H A S H I N G  'bcrypt'+
const hashingPassword = await bcrypt.hash(req.body.password, 10);
//NOTE: 10 -it`s a salt size
 const match = await bcrypt.compare(password, user.passwordHash);
    if(match) {
        //login
    }
/******************  J W T  'jsonwebtoken' *********/
jwt.sign({r8h9ow7:payload}, /*secretOrPrivateKey*/{key:key, passphrase:'x512'},{algorithm:'RS256'}, (err, token)=>{ });

jwt.verify(token, /*secretOrPublicKey*/ key, (err,decoded)=>{
            if (err) {
              /*if it`s inside a Promise*/  reject(err);
            } else {
              /*if it`s inside a Promise*/  resolve(decoded);
            }
        })
	
/****************
░█▀▄▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀█ 　 ░█▀▀▄ ░█▀▀█ 
░█░█░█ █──█ █──█ █─▀█ █──█ 　 ░█─░█ ░█▀▀▄ 
░█──░█ ▀▀▀▀ ▀──▀ ▀▀▀▀ ▀▀▀▀ 　 ░█▄▄▀ ░█▄▄█ - mongoose****************/
//A)define a modell in a file modell.js:
 const mongoose = require('mongoose');
 
//create a schema

 const bookSchema = mongoose.Schema({
     buyTime: {
         type: Date,
         default: ()=>Date.now(),
         immutable: true
     },
     title:{
         type: String,
         required: true,
         minlength: 3,
         maxlength: 32,
     },

     article: {
         type: Number,
           validate:{
               validator:x=>x%2,
               message: pr=>`${pr.value} not even!`
           }
     },
     bookCode: {
         type: String,
         required: true,
            validate:{
              validator: x=>/ISBN.+/.test(x),
              message: p=>`${p.value} isn't correct!`
            }
        },
          author: mongoose.SchemaTypes.ObjectId,
     });

     //some functions for a schema

     bookSchema.methods.show = function (){
         console.log(this.article + "article");
     }

     ///export a modell

     module.exports = mongoose.modell('Book',bookSchema);
	
//B) main JS file 

 const mongoose = require('mongoose');
 const Book = require('./modell.js');
 ///connect to DB

 mongoose.connect("mongodb://localhost/books",
      /*if a connection has established */ ()=>console.log('Connected!')),
      /*if a connection has failed */(e)=>console(e) );

      let book1;
      try{
          book1 = new Book({
              title: "Some title",
              article:186646,
              bookCode:"ISBN123456"
          })
      } catch (e) {
           /*if the tatd isn`t valid */
           console.error(e.message);
      }

      ////save to the database
      book1.save()
      .then(()=>console.log('saved!'))
      .catch(e=>console.error(e))

      //// searching in the DB
      let x = await Book.find({article:3})//returned an array
      /*updating */
    let result = await Book.updateOne({article:3},{$set:{title:"Kolobok"}})
    /**returned object:
     result.acknowleged - TRUE
     result.modifiedCount - 1
              .matchedCount - 1
              .upsortedCount - 0
     */
/*remove*/
let result = await Book.deleteOne({title:'Yahoo'});
/*validate*/
Book.validate(myBook[0])
.then(()=>{/*success*/}
.catch((e)=>console(e.message))
/***find*/
Book.find({title:'mumu'})
.then(result=>{})

/*

█▀ █▀▀ █▄░█ █▀▄   █░█ █▀█ █░░ █▀▀ █▄░█ █▀▀ █▀█ █▀▄ █▀▀ █▀▄ ▄▄ ▄▄ ▄▄ █▀▀ ▀▄▀ █▀█ █▀█ █▀▀ █▀ █▀
▄█ ██▄ █░▀█ █▄▀   █▄█ █▀▄ █▄▄ ██▄ █░▀█ █▄▄ █▄█ █▄▀ ██▄ █▄▀ ░░ ░░ ░░ ██▄ █░█ █▀▀ █▀▄ ██▄ ▄█ ▄█
*/
//----SEND urlencoded---express
	const express = require('express')
	const app = express()
	const port = 80;
        /*for example http://localhost/srv?first=1&second=2 */
	app.get('/ser2', (req, res) => { 
		//print all the params
	    console.log(req.query)
	    console.log(req.query.first);
	    res.send(`${new Date().toLocaleTimeString()}`);
	})
	
/*

█▀ █▀▀ █▄░█ █▀▄   █░█ █▀█ █░░ █▀▀ █▄░█ █▀▀ █▀█ █▀▀ █▀▀ █▀▄   █ █▄░█   █░█ ▀█▀ █▀▄▀█ █░░   █▀▀ █▀█ █▀█ █▀▄▀█
▄█ ██▄ █░▀█ █▄▀   █▄█ █▀▄ █▄▄ ██▄ █░▀█ █▄▄ █▄█ █▄▄ ██▄ █▄▀   █ █░▀█   █▀█ ░█░ █░▀░█ █▄▄   █▀░ █▄█ █▀▄ █░▀░█
*/
/****SEND urlencoced in html FORM****/
///------u s e   c o r r e c t  markup in the  H T M L   f o r m!
// THE HTML <form> MUST have a name attribute in <input> tags. If you ignore this - you recive an empty POST on the server
app.use(express.urlencoded({extended:true}))
/*when a browser send a GET request - end the following content (a form)*/
app.get('/login', (req, res, next) => {
  res.send(`<form method="POST" action="/api/login">
  <input type="text" name="username" placeholder="username">
  <input type="submit">
</form>`);
});
/*when the form is sending POST - proces the data*/
/** Process POST request */
app.post('/login', function (req, res, next) {
  console.log(JSON.stringify(req.body));
  res.status(201).send();
});

/*

█▀▀ █▀█ █▀█ █▄▀ █ █▀▀ █▀
█▄▄ █▄█ █▄█ █░█ █ ██▄ ▄█
*/
/********cookies***** C O O K I E S***
*/

const express = require('express')
const cookieParser = require('cookie-parser')
//************setup express app
const app = express();
// *************let’s you use the cookieParser in your application
app.use(cookieParser());
//************a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});
//***********
// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});
//****secure cookies - a get route for adding a cookie
app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
		  //A secure attribute ensures that the browser will reject cookies
         //unless the connection happens over HTTPS.
        secure: true,
		  //HTTPonly ensures that a cookie is not accessible using the JavaScript code.
          //This is the most crucial form of protection against cross-scripting attacks.
        httpOnly: true,
		  ///sameSite attribute improves cookie security and avoids privacy leaks.
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
});

/*********
█░█ █▀▀ █░░ █▀▄▀█ █▀▀ ▀█▀
█▀█ ██▄ █▄▄ █░▀░█ ██▄ ░█░****************************
Helmet helps you secure your Express apps by setting various HTTP headers.
 It's not a silver bullet, but it can help!**/
 const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());
/******parse URL params*******************/
app.get('/keygen', async(req, res)=>{
const params = req.query;
  if(params.user === '1fe5g7q54e5h4f1d4q6j4d6c54gk' ) {
      try{
        await usersAuthProcedures.pUpdateCommonKeys()
      } catch (e) {
        res.render('503.ejs',{err:e});
        return
      }
      res.type('text/plain');
      res.write('Asymmetric key have been generated successfully!');
      res.end();
      return;
  }

res.redirect('/logoff')
  //  
})
/******
█░█   █▀█   █░░   █▀▀   █▄░█   █▀▀   █▀█   █▀▄   █▀▀   █▀▄
█▄█   █▀▄   █▄▄   ██▄   █░▀█   █▄▄   █▄█   █▄▀   ██▄   █▄▀************
*/
app.use(express.urlencoded({ extended: false }));

/**** http://domain/mode?msr=52&usr=wanya*/
app.get('/mode',(req,res)=>{
    console.log(req.query);
	/*
	{
		msg:'52,
		usr:'vanya'
	}
	*/
    res.sendStatus(200);
})

/*************ejs 

█▀▀ ░░█ █▀
██▄ █▄█ ▄█
*/
/*server`s side*/
/**DEPENDENCES: 'ejs' 'express'*/
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

app.get('/', function(req, res) {
   let impData = [ new Date().toLocaleDateString(), new Date().toLocaleTimeString(), new Date().toUTCString()];
    res.render('index.ejs', {
        data: impData,
    });
});

app.listen(8080);
/***********file index.ejs - MUST be in the folder 'views'*/
/* the code isn`t comment. Uncomment before using!
<ul>
          <%data.forEach( (v)=>{ %>
            <li><%= v %></li>
        <% }); %>
</ul>
*/

///https://www.npmjs.com/package/svg-captcha
//svg-captcha 
var svgCaptcha = require('svg-captcha');
 var captcha = svgCaptcha.create();
 /*returned {text,data} text-i`s a plain text, data -it1s a SVG*/
 
/**********
█░█   █▀█   █░█░█     ▀█▀   █▀█       █▀▀   ▀▄▀   █▀█   █▀█   █▀█   ▀█▀     ▄▀█  
█▀█   █▄█   ▀▄▀▄▀     ░█░   █▄█       ██▄   █░█   █▀▀   █▄█   █▀▄   ░█░     █▀█  

█▀▀ █░░ ▄▀█ █▀ █▀   █ █▄░█   █▄░█ █▀█ █▀▄ █▀▀ ░░█ █▀
█▄▄ █▄▄ █▀█ ▄█ ▄█   █ █░▀█   █░▀█ █▄█ █▄▀ ██▄ █▄█ ▄█*****/
//in 'package.json' file
{
	"type": "module",
	"name: ....
}
	

//some file 'mylib.js'

export default class myClass {
	constructor (s) {
	this.x = s;	
	}
	doSomething() {
		console.log(this.x);
	}
}
//in main.js

import express from 'express';
import crypto from 'crypto';
import myClass  from './mylib.js';

let inst = new myClass("hello");
inst.doSomething();

/****

█▀▀ █▀█ █▄░█ █▀ █▀█ █░░ █▀▀   █▀▀ █▀█ █░░ █▀█ █▀█ █▀
█▄▄ █▄█ █░▀█ ▄█ █▄█ █▄▄ ██▄   █▄▄ █▄█ █▄▄ █▄█ █▀▄ ▄█
**/
//You must use  ANSI Escape Codes.There are online generators in the internet.For example: https://ansi.gabebanks.net/ 
console.log("\x1b[33m%s\x1b[0m", "I am in yellow color");  
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"
FgGray = "\x1b[90m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
BgGray = "\x1b[100m"

/**

██╗░░██╗████████╗████████╗██████╗░██████╗░
██║░░██║╚══██╔══╝╚══██╔══╝██╔══██╗╚════██╗
███████║░░░██║░░░░░░██║░░░██████╔╝░░███╔═╝
██╔══██║░░░██║░░░░░░██║░░░██╔═══╝░██╔══╝░░
██║░░██║░░░██║░░░░░░██║░░░██║░░░░░███████╗
╚═╝░░╚═╝░░░╚═╝░░░░░░╚═╝░░░╚═╝░░░░░╚══════╝
**/
////a simple static file server that returns content divided small slices osing pipes
const http2 = require('http2');
const fs = require("fs");
const mime = require('mime-types');
const path = require('path');
/**define header names**/
const {
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_HEADER_CONTENT_LENGTH,
    HTTP2_HEADER_ACCEPT_CHARSET
  } = http2.constants;

/**create a TLS http2 server ***/
const server = http2.createSecureServer({
    "key":fs.readFileSync("./key.key"),
    "cert":fs.readFileSync("./cert.pem")
})

/**event handlers registration**/

server.on("error",(err)=>{
  console.log(err);
})

////main handler when a stream event
server.on('stream', onStream);


/**MUST BE SYNCRONOUS - otherwise will be errors! **/
async function onStream(stream, headers) {
 /*making an URL to parse search params when exists*/
  let myUrl = new URL(`https://host${headers[HTTP2_HEADER_PATH]}`);
/*get a main resource*/	
  let resource = path.basename(myUrl.pathname);
  let stat;
  try{
  /*********reading file info it MUST BY SYNCRONOUS method, otherwise there 
	  will be errors during executions. You may using results
	 of searching that has been caled later  ***/
	  
    stat  = fs.statSync(`./content/${resource}`);
  } catch(e) {
  //when the file hasn`t been found:
    let erMsg = 'Not found!';
  //write headers and a status code
    stream.respond({
      [HTTP2_HEADER_STATUS]: 404,
      [HTTP2_HEADER_CONTENT_TYPE]:"text/plain",
      [HTTP2_HEADER_ACCEPT_CHARSET]: "utf-8",
      [HTTP2_HEADER_CONTENT_LENGTH]: erMsg.length,
    })
   //send 404 to a client
    stream.end(erMsg);
    return;
  }
  /*****when a file has been found*****/
  let readable = fs.createReadStream(`./content/${resource}`);
  /*****write headers*****/
  stream.respond({
    [HTTP2_HEADER_STATUS]: 200,
    [HTTP2_HEADER_CONTENT_TYPE]:mime.lookup(resource),
    [HTTP2_HEADER_CONTENT_LENGTH]:stat.size
  })
  /****write headers into the stream***/
  stream.write('');
  /***pipe a file readable stream into an http stream**/
  readable.pipe(stream);
  
   stream.on('error',(e)=>{
    console.log(e);
  })


}
///listen
server.listen(8443,()=>console.log('Listen http2  on 8443...'));

/********************************************************************/

/***

█▀█ █░█ █▀ █░█
█▀▀ █▄█ ▄█ █▀█
***/
const http2 = require('http2');
const fs = require("fs");
const mime = require('mime-types');
const path = require('path');

const {
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_STATUS,
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_HEADER_CONTENT_LENGTH,
    HTTP2_HEADER_ACCEPT_CHARSET,
    HTTP2_HEADER_SERVER,
  } = http2.constants;


main();


async function main(){
  /**create a server */
  let server = http2.createSecureServer({
    key: fs.readFileSync('key.key'),
    cert: fs.readFileSync('cert.pem'),
  })


 //**get all the files in directory */
 let files = await findAllTheFiles();
 /***register a function */
 server.on('stream', onStream);

    async function onStream(stream, headers) { 
      console.log(headers)
      /***when the path is main - start pushing  */
      if (headers[HTTP2_HEADER_PATH]==='/index.html') {
                /**set a headers for the main file  index.html*/
            stream.respond({ [HTTP2_HEADER_STATUS]:200, 
                    [HTTP2_HEADER_CONTENT_TYPE]:'text/html',
                    [HTTP2_HEADER_CONTENT_LENGTH]:files.get('index.html').size,

            })
          
            /***iterate all the files in the folder - excluse index.html */
            files.forEach(async(val, key)=>{
              if (key != 'index.html') { 
                  pushContent(stream, key);
              }
            })
            /**response with a main file /index.html */
                stream.end(fs.readFileSync('./content/index.html'));

        } else { 
            /**when the path isn`t main */
            stream.respond({ [HTTP2_HEADER_STATUS]:200,   })
            stream.end('');
         }

  }
    
    server.listen(8443,()=>console.log('Listen on 8443'))
 
}



  /**search all the files  */
  async function findAllTheFiles(dir='./content'){
    let contentBase = new Map();
      let filenames = await fs.promises.readdir(dir);
     
      for (let idx = 0; idx < filenames.length; idx++) {
        let info = await fs.promises.stat(`${dir}/${filenames[idx]}`);
        contentBase.set(filenames[idx], info);
      }
    return contentBase;
    }
   /***push procedure */

     function pushContent (streamWeb, fName) {
          /**reading a file from HDD */
        let fBuffer = fs.readFileSync(`./content/${fName}`);
        /***define headers */
        const pushHeaders = { 
          [HTTP2_HEADER_STATUS]:200,
          [HTTP2_HEADER_CONTENT_LENGTH]: fBuffer.length,
          [HTTP2_HEADER_CONTENT_TYPE]: mime.lookup(fName),
          [HTTP2_HEADER_SERVER]:'Kozak/1.0 Unix',
        }
        /***create a push stream */
        streamWeb.pushStream({[HTTP2_HEADER_PATH]: `/${fName}`}, (err, pushStream, headers) => {
          if (err) {
            return err
          }
          /**write headers for pushing */
          pushStream.respond(pushHeaders);
          console.log(`PUSHED:${fName}`)
          /**push with the file and headers */
          pushStream.end(fBuffer);         
        })
     
   
  }

 /**
 
█▀▀   █▀█   █▀█   █▄░█   ▀█▀   █▀▀   █▄░█   █▀▄
█▀░   █▀▄   █▄█   █░▀█   ░█░   ██▄   █░▀█   █▄▀
 **/
 
 //F R O N T E N D - F R O N T E N D - F R O N T E N D - F R O N T E N D
 
 /*****FRONTEND SNIPPETS**************/
 //a table with selectable rows using Bootstrap
 class UsersLoginList {
  constructor () {

  }

  createTable (arg = [
    { one: 1, two: 2, three: 3 },
    { one: 4, two: 5, three: 6 },
    { one: 7, two: 8, three: 9 }
  ]) {
    const tbody = document.createElement('tbody')
    const table = document.createElement('table')
    table.classList.add('table')

    let keysOfColumns = []
    keysOfColumns = Object.getOwnPropertyNames(arg[0])
    // create table rows and append it to the tablebody
    arg.forEach(val1 => {
      const tmp = []
      // create a row key - a name of the first member of an oject 
      /*(for example [{one:1,two:2,three:3},{one:4,two:5,three:6}]) 1 and 4 - are keys*/
            const rowkey = val1[keysOfColumns[0]]
      // create an arry of values
      keysOfColumns.forEach(val2 => {
        tmp.push(val1[val2])
      })
      const rowTable = this._createTableRow({ key: rowkey, xArg: tmp })
      tbody.appendChild(rowTable)
    })
    // create a header
    const theader = this._createTableHeader(keysOfColumns)

    table.appendChild(theader)
    table.appendChild(tbody)

    tbody.addEventListener('click', onCLick)

    // add tooltips
    const tooltipTriggerList = [].slice.call(table.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    return table
    /// ///an event handler
    function onCLick (evt) {
      const tbody = evt.target.parentNode.parentNode
      const tr = evt.target.parentNode
      const oldRow = tbody.querySelector('.selectedRow')
      if (oldRow) {
        oldRow.classList.remove('selectedRow')
      }
      tr.classList.add('selectedRow')
    }
  }

  _createTableRow (inp = { xArg: ['one', 'two', 'three'], key: 'k1' }) {
    const row = document.createElement('tr')
    // set a row key
    row.setAttribute('data-tbl-rk', inp.key)
    row.setAttribute('data-bs-toggle', 'tooltip')
    row.setAttribute('data-bs-placement', 'top')
    row.setAttribute('title', 'click/touch for select')
    //apply my own class
    row.classList.add('myTableRow')
    inp.xArg.forEach((v) => {
      const td = document.createElement('td')
      td.innerText = v
      row.appendChild(td)
    })
    return row
  }

  _createTableHeader (titles = ['tit1', 'tit2', 'tit3']) {
    const thead = document.createElement('thead')
    thead.classList.add('myTableHead')
    const tr = document.createElement('tr')
    titles.forEach((val) => {
      const th = document.createElement('th')
      th.innerText = val
      tr.appendChild(th)
    })
    thead.appendChild(tr)
    return thead
  }
}

/**

██╗░░░██╗████████╗███████╗░░░░░░░█████╗░  ██████╗░░█████╗░░██████╗███████╗░█████╗░░░██╗██╗
██║░░░██║╚══██╔══╝██╔════╝░░░░░░██╔══██╗  ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔═══╝░░██╔╝██║
██║░░░██║░░░██║░░░█████╗░░█████╗╚█████╔╝  ██████╦╝███████║╚█████╗░█████╗░░██████╗░██╔╝░██║
██║░░░██║░░░██║░░░██╔══╝░░╚════╝██╔══██╗  ██╔══██╗██╔══██║░╚═══██╗██╔══╝░░██╔══██╗███████║
╚██████╔╝░░░██║░░░██║░░░░░░░░░░░╚█████╔╝  ██████╦╝██║░░██║██████╔╝███████╗╚█████╔╝╚════██║
░╚═════╝░░░░╚═╝░░░╚═╝░░░░░░░░░░░░╚════╝░  ╚═════╝░╚═╝░░╚═╝╚═════╝░╚══════╝░╚════╝░░░░░░╚═╝

*/
//you must also generate nonce for inline scripts (otherwise browser blocking your inline script):
//here is an example of middleware function with Express and Helmet: 
app.use(async (req, res, next) => {
  // Generate a random nonce for each request
 
     res.locals.nonce = await new Promise((resolve, reject) => {
                            crypto.randomBytes(16,(err,buf)=>{
                              resolve(buf.toString('base64'))
                            })
      });

      helmet({
        contentSecurityPolicy: {
          directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", `nonce-${res.locals.nonce}`],
                fontSrc: ["'self'", 
                            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1", 
                            "https://maxcdn.bootstrapcdn.com", 
                            "https://cdn.jsdelivr.net",
                            "https://cdnjs.cloudflare.com",
                            "https://fonts.gstatic.com",
                            "https://fonts.googleapis.com"
                          ],

                styleSrc: [ "'self'", 
                            "'unsafe-inline'",
                            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
                            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
                            "https://cdn.jsdelivr.net",
                            "https://cdnjs.cloudflare.com",
                            "https://maxcdn.bootstrapcdn.com",
                            "https://fonts.googleapis.com"
                          ],

                scriptSrc: ["'self'",
                            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js",
                            "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/"
                          ],

                imgSrc: ["'self'", "https://mdbcdn.b-cdn.net","https://mdbootstrap.com"],

                        
                
                // Add other directives as needed
          },
        },
      })

  next();
});
///-----------------backend part:
 let JsonString =JSON.stringify([{city:"Київ", address:"Хрещатик",house:26},{a:1,b:2,c:3}]);
//creating a buffer
  let buf = Buffer.from(JsonString,'utf-8');
//encode to Base64
  const base64String = buf.toString("base64");
///render in express Ejs Engine:
  res.render('index', { title: 'Express', myVar:base64String });
///-----------------frontend part in EJS (at the top of <body>):
<script defer nonce="<%= nonce %>">
    window.myVar = '<%= myVar %>';
  </script>
//----an anothr script - that include at the end of html page as a js file:
window.onload=function(){
    
    function base64ToBytes(base64) {
        const binString = atob(base64);
        return Uint8Array.from(binString, (m) => m.codePointAt(0));
      }
      
      function Decodeuint8arr(uint8array){
        return new TextDecoder("utf-8").decode(uint8array);
    }
        //let props = JSON.parse(window.myVar);
        console.log(window.myVar);
        var decodedJsonString =  base64ToBytes(window.myVar);

      console.log(Decodeuint8arr(decodedJsonString));

    
}
