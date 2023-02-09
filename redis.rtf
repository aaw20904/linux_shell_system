/*
Redis exposes FIVE diferent data structures, only one of which is a typical key-value structure.
  ***DATABASES*** 
Redis contains databases.THe defaulkt DB is 0. To swith to an anoher DB - type "select 1". 
***DATA***
 For the most part,
Redis treats values as a byte array and doesn’t care what they are.
***AUTOSAVE***
Redis saving on a disk based how many keys and data has been changed.By default, Redis will save the database every 60 seconds if 1000 or
more keys have changed all the way to 15 minutes if 9 or less keys has changed. 

...length of saved data:
  STRLEN key
...write at the end of the data additional chunk "value":
  APPEND key value
  
  **increment/decrement**
...add 1 to value.Whwn there isn`t an integer (string form opf int) - there will be an error
  INCR key 
...add a number to exists value (string repr. of int.):
  INCRBY key 7
...decrement functions
   DECR key
...also
   DECRBY key
   << h a s h >>  - one key plus several fields
   The important difference is that caches provide an extra level of indirection: a field.
   For example let`s create a hash:
 ...create a hash  
    HSET car num 2757
 ...read a spec field:
    HGET car num
 ...create a hash and set multiple fiels at one action:
    HMSET car driver bob num 2727 mark bmw
 ...get several fields 
    HMGET car num mark driver
 ...get a l l   t h e   fileds:
    HGETALL car
 ...get  a l l  t h e   k e y s:
    HKEYS car
 ..remove a field
    HDEL car num
    
 << L I S T S >>
 Lists let you store and manipulate an array of values for a given key. You can add values to the list, get the first or last
value and manipulate values at a given index.
 ...LTRIM reduces a list to the specified range of elements.
 ...trim all exclude last 10 users
      LTRIM users 0 50
 ...LPUSH adds a new element to the head of a list;
      LPUSH user  jack
 ...RPUSH adds to the tail.
 ...LPOP removes and returns an element from the head of a list;
      LPOP user
 ...RPOP does the same but from the tails of a list.
 ...LLEN returns the length of a list.
      LLEN user
      
   << S E T S >> - a list of unique keys - they may not be duplicated
    Sets are used to store unique values and provide a number of set-based operations, like unions
 ...add values to set
     SADD cars zaz vaz vw
 ....remove value from a set:
     SREM cars zaz
 ...is the key in set?
     SISMEMBER cars mg
 ....intersection of two sets (common items):
    SINTER cars mycars
 ...intersection of two sets and saving resut:
    SINTERSTORE  cars mycars  commoncars
    
    << S O R T E D   S E T S >>
    ....create a sorted list and add members - in format 'score1 value1, score2 value2, ' 
         ZADD faveGuitarists 4 "Stephen Malkmus" 2 "Rosetta Tharpe" 3 "Bola Sete" 3 "Doug Martsch" 8 "Elizabeth Cotten" 12 "Nancy Wilson" 4 "Memphis Minnie" 12 "Michael Houser"
    ....get members with score from 0 to 2
         ZRANGE faveGuitarists 0 3
         
    << t r a n s a c t i o n s >>
    Redis is actually single-threaded, which is how every command is guaranteed to be atomic.While one command is executing, no other command will ru
    To group several commanmds as an transaction - use MULTI command, then commands, after this EXEC or DISCARD to throw away.
    MULTI
      SET var 2
      INC var
    EXEC  ( DISCARD )
    
    << antipattern >>
   !! don`t use KEYS commnad in production! It`s slow! KEYS Returns all keys matching pattern.
   
   << E x p i r a t i o n >>
    Redis allows you to mark a key for expiration. There are 2 variants: seconds or Unix timestamp in mS since 1970.
    ....The first command will delete the key (and associated value) after 30 seconds
       EXPIRE key 30
    .....The second does the same at 12:00 a.m. December 31st, 2012
       EXPIREAT key 1356933600
    ....set a string and specify a time to live in a single atomic command:
       SETEX pages:about 30 '<h1>about us</h1>....'
       
      << P U P L I C A T I O N  /  S U B S C R I B T I O N >>
      Open a second terminal window** and enter 'redis-cli'. When a cli has been loaded - subscribe on a channel 'mychannel'
         SUBSCRIBE mychannel
      Open a first terminal with redis-cli and publish a message:
         PUBLISH mychannel 'helloword!'
      This message appears in the second** window.
      To unsubscribe enter the following command:
        UNSUBSCRIBE mychannel
      
      << M o n i t o r   and  S l o w  L o g >>
      long with monitor, Redis has a slowlog which acts as a great profiling tool. It logs any command which takes longer
than a specified number of microseconds
      CONFIG SET SLOWLOG-LOG-SLOWER-THAN 0
      
      << S O R T I N G >>
      By default, list, set: sorting is numeric and elements are compared by their value interpreted as double precision floating point number
        SORT mylist
      ...from large to small
        SORT mylist DESC
      ...sort symbols lexicographically
        SORT mylist ALPHA
      ...use start point (0)  and limit of found elems (10):
        SORT mylist LIMIT 0 10
      
      << Administration >>
      It includes : Authentication, size limitation, replication , backups, scalling and Redis Cluster
      
      More: https://www.openmymind.net/redis.pdf   "the little Redis book"
      ----------------------------------------------------------------------------------------------------------------------------------------------------
*/

/* S H O R T    C O N S P E C T ---------------------
..add key-value pair:
    set  status  1
..get value by a key:
    get status
    1
 ..remove pair:
   del status
 ..is the pair in system?
   EXISTS my_key
   1
 ..list of exisitng keys:
   keys *
   1) "name"
   2) "date"
 ..deletes all keys in all databases:
   flushall 
 ..command deletes the keys in a database
   flushdb
   << t i m e    t o  l i v e >>
 .. time to live of the pair:
   ttl mykey
   -1
  ..set a time to live of a pair - 10 sec:
    expire name 10
  ...or:
    setex my_key 10 'some data'
  ..NOTE..when a time to live as been expired - the pair will not be avaliable
   << a d d   a    'l i s t'   - push on the left (at the begin) >>
     lpush my_list item1
   ..get a list from index0 to index -1:
     lrange my_list 0 -1
     1)"item1"
   ..add an another item:
     lpush my_list item2
   ..add by pushing on the right (at the end)
     rpush my_list item3
   ..pop from the end of a list (returns the end elem and remove the one):
     rpop my_list
   ..pop from the begin of a list (returns the last elem of a kist and remove the one):
     lpop my_list
  << a d d   a   s e t  >>
  ..adding
     sadd hobbies "weight lifting"
  ..reading
    smembers hobbies
  ..remove 
    srem hobbies "weight lifting"
    
   << h a s h e s    >>
  ..create a hash  , add a key 'name' with the value
    HSET person name kyle
  ..add a  a key - surname vith the value
    HSET person surname simpson
  ..get a value of key - name
    HGET person name
  ..get all the keys and values
    HGETALL person
  ..delete the key - name
    HDEL person name
  ..is a key exists?
    HEXISTS person name
    
   
    
   
  
   
 
  

*/
