
/*
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
     
   
  
   
 
  

*/
