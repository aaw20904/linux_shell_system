/**THe json web token consists from 3 parts:
1)Headers
2)A content
3)The signature
They are in the base64url format and comma separated

A signature - made by the "crypto.createSign()" function
There using a PRIVATE KEY to sign
The data to signing - first two parts separated by comma.
*/

/***validation:
break into 3 parts
Push a header and a content (comma separated) into decode function " crypto.createVerify()"
Verify using thrid part of JWT and a PUBLIC KEY.
**/

/********
A header, a content , a signature - are Base64 strings , dot separated.
********/

/********
there is a sign/verify functions from scratch. But
you can use a library "jsonwebtoken" - it`s much easy.
Therefore using  "jsonwebtoken".There a short example for this library:
It`s a short example.Please read documentation for use the library!
*******/
var jwt = require('jsonwebtoken');

var privateKey = fs.readFileSync('private.key');
jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});

var cert = fs.readFileSync('public.pem');  // get public key
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo) // bar
});

/***** e x p l a n a t i o n   j w t    b y   e x a m p l e***/
/**M A K I N G  a  J W T***/
/***********
dependences:
*/
  const crypto = require('crypto');
  const signatureFunction = crypto.createSign('RSA-SHA256');
  const verifyFunction = crypto.createVerify('RSA-SHA256')
  const base64url = require('base64url');
  const fs= require('fs');
/***********
For example we have some data - an object and a header:
**/

  const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }
  
  const headerObj = {
    alg: 'RS256',
    typ: 'JWT'
  }
  
/*******
Firstly, we translatsing it to JSON,
secondly - converting to base64url using the  'base64url' library:
*****/
 

  let header64 = JSON.stringify(headerObj);
   header64 = base64url(header64);

  let payload64 = JSON.stringify(payloadObj);
  payload64 = base64url(payload64);

/*****
We needs an asymmetric RSA key pair. 
*****/

    -----BEGIN RSA PRIVATE KEY-----
    MIIBOQIBAAJAa0bfygQ09yshBlHHBa5wm8takPkFfDFMGzVgWSnIkhWKZylPviM9
    i0YtGNlAtYnpknYx1gtvIa2Im+xXf3Jc8QIDAQABAkAK//lyfXvw3DtGqpv9uSVS
    1Ec1FlO5qFRlddOrUN2AHRNW/W6Twi5C8MHy3yvRuY5iD2S8NCLsCbcf2CaGfqEB
    AiEAp+lQo6SXEAfqcfZhmvr6U/4VkA/zhRHNXWuuwn/Jw/8CIQCjjkYsqfnQq5/P
    uF4Y5QXT6wO5toRxXqHgdl0I3BwfDwIgLH7ojqT0Hxxp5U9MKDywD4f6gNWpS68f
    A82gXwxsFFMCIAa5JH1Vh2ViiLE7PPL9Bx5M/Nw3en5Gi5T0iKKCmc1VAiEAjydE
    L+wgekrIAnOp1NnpHwZRRAURTzE9YrtR+uKjjmY=
    -----END RSA PRIVATE KEY-----

    -----BEGIN PUBLIC KEY-----
    MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAa0bfygQ09yshBlHHBa5wm8takPkFfDFM
    GzVgWSnIkhWKZylPviM9i0YtGNlAtYnpknYx1gtvIa2Im+xXf3Jc8QIDAQAB
    -----END PUBLIC KEY-----
  
/****************
*let`s  sign a first part (header and data in base64url format:)
****************/
    //read a private key:
   const privKey = fs.readFileSync('private.pem','utf8');
   signatureFunction.write(`${header64}.${payload64}`);
   signatureFunction.end();
      
/**processing and Base64url**/
  const signatureBase64 = signatureFunction.sign(privKey,'base64');
  const signatureBase64Url = base64url.fromBase64(signatureBase64);
/*****print to out the result - json web token*********/
  console.log(`${header64}.${payload64}.${signatureBase64Url}`);



/*************
D E C O D I N G  J W T = verification
***************/
/*****
firstly - break a JWT into three parts, where a comma is a separator (using a String.split('.') method).
There we already have two parts - push it into decoding function:  
******/

  const pubKey = fs.readFileSync(__dirname +'/public.pem','utf8');
  verifyFunction.write(`${header64}.${payload64}`);
  verifyFunction.end();
/***verify**/
  const sigatureIsValid = verifyFunction.verify(pubKey,signatureBase64Url,'base64');
/***print results***/
  console.log(sigatureIsValid)
