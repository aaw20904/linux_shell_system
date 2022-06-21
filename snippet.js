/*******HTTPS expressjs  + static content HEADER**************************/
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

let server = https.createServer(options, app);
 
server.listen(3000,()=>console.log('listen on :3000...'));
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



/*****BACKEND Express/MySQL/Express************S N I P P E T S************/

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
	
	/****OPEN SSL*** generate self-signed cert*/
	
	openssl req -nodes -new -x509 -keyout server.key -out server.cert
	/* C R Y P T O*****************/
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

/****random bytes - symmetric key**/
crypto.randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

///syncronous
const {
  randomBytes
} = await import('crypto');

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
	
/****************MongoDB - mongoose****************/
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


/****SEND urlencoced in html FORM****/
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

/*********helmet
Helmet helps you secure your Express apps by setting various HTTP headers.
 It's not a silver bullet, but it can help!**/
 const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());

/******urlencoded************
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

/*************ejs EJS*/
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

 
