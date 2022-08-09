
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
/----IMPORTANT: Per bcrypt implementation, only the first 72 bytes of a string are used. Any extra bytes are ignored when matching passwords


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
/********S Y M M E T R I C  E N C R Y P T I O N *********************/
