/***show databases***/
show dbs
/**select the dbase*/
use mybase
/***show collections of key-value pair(s):**/
show collections
/***to find all values of the collection**/
db.collection_name_here.find().pretty();
