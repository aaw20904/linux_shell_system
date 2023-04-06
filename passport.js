/* https://youtu.be/F-sFp_AvHc8 01:50 02:37 https://www.passportjs.org/docs/
https://www.passportjs.org/concepts/authentication/downloads/html/ */
/***  https://github.com/zachgoll/express-jwt-authentication-starter/tree/final   **/

/*** t h e   l o c a l   s t r a t e g y***/

/***
A client send a name and a password => server
client         <=   server validate them and create
                    a session in the DB.
                    Sends a sessionID as a cookie
client request =>   server
client          <=  verify the cookie and send 
                    back a response.When fail - 
                    sends 403.

***/
