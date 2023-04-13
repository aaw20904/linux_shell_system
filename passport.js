/* https://youtu.be/F-sFp_AvHc8 01:50 02:37 https://www.passportjs.org/docs/
https://www.passportjs.org/concepts/authentication/downloads/html/ */
/***  https://github.com/zachgoll/express-jwt-authentication-starter/tree/final   **/

/**** '.env' file: ***/
DB_STRING=mongodb://localhost:27017/base1
SECRET=hole1235
/*** t h e   l o c a l   s t r a t e g y***/

/***
client 
credantails    =>    server

client         <=   server validate them and create
                    a session in the DB.
                    
client         <=   A server sends a sessionID as a cookie
                   
client`s query =>  verify the cookie and send 
                    back a response.When fail - 
                    sends 403.

***/

https://github.com/Stevealila/passport_local/blob/main/routes/users.js
