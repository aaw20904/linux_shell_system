///  https://betterprogramming.pub/beginners-guide-to-data-encryption-with-node-js-95d458db1bdd
//------------------H M A C----------------------- 
/******keyed-hash message authentication code****/
//---an encrypted message building by a public key
///---HMAC = 'my some message' + public key 
  const crypto = require('crypto');
  const pubKey = "password";
  const message1 = 'helloWord';
  const message2='helloWord';
/***the first HMAC data**/
  const hmac1 = crypto.createHmac('sha256', pubKey).update(message1);
  const result1 = hmac1.digest('hex');
/**the second HMAC data**/
  const hmac2 = crypto.createHmac('sha256', pubKey).update('message2);
  const result2 = hmac2.digest('hex');
/**compare both **/
const match = crypto.timingSafeEqual(Buffer.from(result1), Buffer.from(result2));

//---------------S C R Y P T algorhythm-------------------------
/****** Scrypt is a password-based key derivation function that is designed to be expensive
computationally and memory-wise in order to make brute-force attacks unrewarding.
The salt should be as unique as possible. It is recommended that a salt is random
and at least 16 bytes long.********/
  const hash = crypto.createHash('sha256');
  /**generate salt - resolve a buffer */
  function createSalt () {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16,(err, buf)=>{
              if (err){ reject(err) }
              resolve(buf);
          })
      }); 
  }
  /**encrypt a message (passw) - resolve a buffer */
  function runScrypt(passw, salt) {
      return new Promise((resolve, reject) => {
          crypto.scrypt(Buffer.from(passw), salt, 64, (err, key)=>{
              if(err){ reject(err) }
              resolve(key);
          })
      });
  }

  async function execScrypt (psw1="", psw2="") {
      let salt = await createSalt ();
    ///encrypt first
      let hashedPassword1 = await runScrypt (psw1, salt);
    ///encrypt second  
    let hashedPassword2 = await runScrypt (psw2, salt);

      return {    
              hashedPassword1: hashedPassword1, 
              hashedPassword2: hashedPassword2,
              salt: salt,
            };
  }

  let result = await execScrypt('one','one');
  let compare = crypto.timingSafeEqual(result.hashedPassword1, result.hashedPassword2);
/**********************************H A S H************************/
  const hash = crypto.createHash('sha256');
  const psw = "password" 
  let result = hash.update(psw).digest('hex');
/******************B C R Y P T************************************/
/*bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999.
[1] Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be
increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power.*/
//----IMPORTANT: Per bcrypt implementation, only the first 72 bytes of a string are used. Any extra bytes are ignored when matching passwords


const bcrypt = require('bcrypt');
 const saltRounds = 10;

 function encode(myPlaintextPassword=''){
    return new Promise((resolve, reject) => {
 //*********encoding********
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            if (err) { reject(err) }
            resolve(hash);
        });
    });
 }

 function compareData(myPlainTextPassword='', hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlainTextPassword, hash, function(err, result) {
            // result == true
            if(err) { reject(err) }
            resolve (result);
        });
    });
 }


encode('password')
.then((hashed)=>{
    console.log(hashed);
    return compareData('password',hashed);
})
.then(x=>console.log(x))
.catch(e=>console.log(e));
/*----------------S Y M M E T R I C  E N C R Y P T I O N (weak)--------------*/

const crypto = require('crypto');

const message = 'i like turtles';
  /**public key */
const key = crypto.randomBytes(32);
  /**an initialization vector base */
const iv = crypto.randomBytes(16);
  /**create an initialization vector  */
const cipher = crypto.createCipheriv('aes256', key, iv);
  //encrypt
let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
//encrypted message
encrypted += cipher.final('hex');
  //create decrypt initialization vecctor
const decipher = crypto.createDecipheriv('aes256', key, iv);
let decryptedMessage = decipher.update(encrypted, 'hex', 'utf-8');
decryptedMessage += decipher.final('utf8');
console.log(decryptedMessage);
//--------SY M M E T R Y C  E N C R I P T I O N   (STRONG)-----------/
/**
1)Create a key fon encryption.This can be created using a Password-Based Key Derivation
Function, or PBKDF. In short, PBKDFs can be used to turn a user’s password into a
good random key for use in encrypting sensitive information.
*/

  let config = {
    cryptoKey: crypto.randomBytes(32),
    cryptoAlgo:"aes256",
    iv:null
  }
/*According the the docs, Node uses OpenSSL to create ciphers. Apparently,
the default functionality used by the createCipher function in Crypto derives keys with an MD5 hash,
NO salt (!), and ONE iteration(!).This means that an attacker could brute-force the password (key) 
used to create the IV and cipher. Once guessed, the encryption is useless.
So that is why we NEED to create our own Initialization Vector using a PBKDF function. Let`s wrap 
 a function pbkdf2() in a promise: 
*/
  async function generatePasswordAndIV() {
      let config = {
        cryptoKey: crypto.randomBytes(32),
        cryptoAlgo:"aes256",
        iv:null
      }
       let salt = randomBytes(16);
      try{
         config.iv = await new promise((resolve,reject)=>{
                crypto.pbkdf2(config.cryptoKey, salt, 100000, 16, 'sha512', (err, derivedKey)=>{
                    if (err) {
                      reject(err) 
                    }
                  resolve(derivedKey);
                });
        
        })
      }catch(e) {
       throw new Error(e); 
      }
    
    return config;
    
  }

  //CODE in main function 'app.js'
  //note: input and output are buffers.You can also using strings and encoding.See nodejs.org - see crypto.creadeCipheriv(), update() final()
  let config = await generatePasswordAndIV();
  var cipher = crypto.createCipheriv(config.cryptoAlgo, config.cryptoKey, config.iv);
  let result = [cipher.update(Buffer.from([0x01,0x02,0x03]) )];
  result.push(cipher.final());
  result = Buffer.concat(result);

  var decipher = crypto.createDecipheriv(onfig.cryptoAlgo, config.cryptoKey, config.iv);
  let raw = [decipher.update(result)];
  raw.push(decipher.final());
  raw = Buffer.concat(raw);

  return result;

//--------------*A S Y M M E T R Y C   ENCRIPTION*------------------------/
//1)making key pairs
function makeAsymmetricKey() {
    return new Promise((resolve, reject) => {
               crypto.generateKeyPair('rsa', {
                    modulusLength: 2048, // the length of your key in bits
                    publicKeyEncoding: {
                        type: 'spki', // recommended to be 'spki' by the Node.js docs
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
                        format: 'pem',
                    },
                }, (err, publicKey, privateKey) => {
                        if (err) { reject(err) }
                        //returns keys as strings
                     resolve({privateKey:privateKey, publicKey:publicKey})
                    });

    });
}
///THE same: but input nd output is Buffer
     
    var cryptedBuffers = [cipher.update(new Buffer('this is some test'))];
    cryptedBuffers.push(cipher.final());
    // at this point `cryptedBuffers` is an array of buffers which you can turn 
    // into a single buffer by doing

    var crypted = Buffer.concat(cryptedBuffers);

//2)******* PUBLIC ENCRYPT (standard approach in TLS)
//returns Buffer
let encrypted =  crypto.publicEncrypt(publicKey, 'myMessage')

//3)*****PUBLIC DECRYPT **********************
//returns Buffer
/*@ arguments: string,Buffer, typedArray*/
let decrypted =  crypto.publicDecrypt(key, buffer);

//4)*****PRIVATE DECRYPT  (standard approach in TLS)
//returns Buffer
 let decrypted = crypto.privateDecrypt(key, buffer)
 
 //5)****PRIVATE ENCRYPT
 //returns Buffer
 let encypt = crypto.privateEncrypt(privateKey, buffer)

  


