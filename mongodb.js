/***mongo shell:***/
$ mongosh
/***show databases***/
show dbs
/**select the dbase*/
use mybase
/***show collections of key-value pair(s):**/
show collections
/***to find all values of the collection**/
db.collection_name_here.find().pretty();
/***remote acess**/
sudo ufw allow from remote_machine_ip to any port 27017
sudo ufw reload
/****/
https://repost.aws/knowledge-center/ec2-linux-resource-over-utilization
