
//------------------HMAC----------------------- 
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
