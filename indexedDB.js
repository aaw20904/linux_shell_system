/*******************IndexedDB******************************/
/**for the start you can checking - is the browser supporting IndexeDB?*/


if (! ("indexedDB" in window) ) {
    alert('indexedDB not supported!');
    return; 
    //No support? Go in the corner and pout.
}
/**********************************
*****if there is OK, try to open (or create ) a DB*/
//open the database: params are @name and @version
//No need do bother about DB name - because 
//each site (domain) in a browser has his own storage  
var openRequest = indexedDB.open("ora_idb5",4);
//when our version greater that current in the browser (or not exists there)-
//calls this callback function 
openRequest.onupgradeneeded = function(e) {
    var thisDB = e.target.result;

    console.log("running onupgradeneeded");

    if (!thisDB.objectStoreNames.contains("people")) {
        //if there isn`t a store 'people' - create it, 
        //asign a property 'keyPath'.
        //It means that you have in an object which you want to save
        // a property with name "email", which will use as the primary key 
        var peopleOS = thisDB.createObjectStore("people",{keyPath: "email"});
    
    }
    if (!thisDB.objectStoreNames.contains("notes")) {
        //if there isn`t a store 'notes' - create the one
        //the primaryKey - auto assign and increment 
        //In this case we assign automatic primary key which
        //will be incrementing
        var notesOS = thisDB.createObjectStore("notes", {keyPath:"id",autoIncrement:true} );
    }
}
//THis callback usually calls AFTER 'onupgradeneeded'
//when a database has opened successfully:
openRequest.onsuccess = function(e) {
    console.log("running onsuccess");
    //retrive a database and assign to a global variable 
    db = e.target.result;
    
}

openRequest.onerror = function(e) {
    console.log("onerror!");
    console.dir(e);
}

/***************adding a record to the DB:
*****/
function addPerson(e) {
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    console.log("About to add "+name+"/"+email);
    //start a transaction
    var transaction = db.transaction(["people"],"readwrite");
    //Ask for the objectStore
    var store = transaction.objectStore("people");
    //Define a person 
        var person = {
            name:name,
            email:email,
            created:new Date().getTime()
        }
    //Perform the add
    var request = store.add(person);
    //callback when fail:
    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
    }
   //callback when  success
    request.onsuccess = function(e) {
         console.log("Woot! Did it");
    }
}

/**an another function*/
function addNote(e) {
        var note = document.querySelector("#note").value;
        console.log("About to add "+note);
        //Get a transaction
        //default for OS list is all, default for type is read
             var transaction = db.transaction(["notes"],"readwrite");
        //Ask for the objectStore
            var store = transaction.objectStore("notes");
        //Define a note
        var note = {
            text:note,
            created:new Date().getTime()
        }
        //Perform the add
        var request = store.add(note);

            request.onerror = function(e) {
                console.log("Error",e.target.error.name);
            //some type of error handler
            }
            request.onsuccess = function(e) {
                console.log("Woot! Did it");
            }
    }
/******************get an information***/
function getPerson (p) {
        var key = document.querySelector('#getemail').value;
        if (key === '') {
            return;
        }
        //start the transatcion
        let transaction = db.transaction(["people"],"readonly");
        //get the store
        var store = transaction.objectStore("people");
        //try to to an axction (read)
        var request = store.get(key);
            //callback - when success
            request.onsuccess = function(e){
                //if havn`t found 
                if(!e.target.result){
                    alert('The Record not found!');
                    return;
                }
                var result = e.target.result;
             //print a result
                console.dir(result);
            }
            //callback - when fail
            request.onerror = function(e) {
                console.error(e);
        }

    }
/*****an another function*****/


function getNote (p) {
        var key = document.querySelector('#getnote').value;
        if (key === '') {
            return;
        }
        //start transaction
        var transaction = db.transaction(['notes'],"readonly");
        //get objectStore
        var store = transaction.objectStore("notes");
        //
        var request = store.get(Number(key));

            request.onsuccess = function(e){
                var result = e.target.result;
                if (!result) {
                    alert('The record not found!');
                    return;
                }
                document.querySelector('#foundnote').value = result.text;
                console.log(result);
            }

            request.onerror = function(e){
                console.error(e);
            }
    }

/***********UPDATE value************/
function updatePerson(p) {
        var name = document.querySelector("#name").value;
        var email = document.querySelector("#email").value;
        var created = new Date().getDate();

        //start a transaction
        let transaction = db.transaction(["people"],"readwrite");
        //ask the objectStore
        var store = transaction.objectStore('people');
        var person = {
            name: name,
            email: email,
            created: created
        }

        //try to change a data
        var request = store.put(person);

            request.onerror=(err)=>{
                console.log(err);
            }

            request.onsuccess=()=>{
                alert('The data has been changed successfully!');
            }
    }

/*****an another function********/
function updateNote(p) {
        var key = document.querySelector('#getnote').value;
        var note =  document.querySelector('#foundnote').value;
        
        //start a transaction
        let transaction = db.transaction(["notes"],"readwrite");
        //ask a store 
        let store =  transaction.objectStore('notes');
        //assign a new object
        var note = {
            id:Number(key),
            text:note,
            created:new Date().getTime()
        };
        //try to change
        let request = store.put(note);

            request.onsuccess=()=>{
                alert('The data has been changed successfully!');
            }

            request.onerror=(e)=>{
                console.error(e);
            }

    }

/**********DELETE the record***********/
  function  deleteNote(p) {
        var key = document.querySelector('#getnote').value;
        //start a transaction
        let transaction = db.transaction(["notes"],"readwrite");
        //ask a store 
        let store =  transaction.objectStore('notes');
        //try to delete
        let result = store.delete(Number(key));

            result.onsuccess=()=>{
                console.log('THe resource deleted successfully!');
            }

            result.onerror=(e)=>{
                console.error(e);
            }

    }

/*********GET the cursor : iterate a collection of objects in store
*/
    function allTheObjects (storeName="notes") {
     /**in this example using promises*/
       return  new Promise((resolve, reject) => {
          
        //start the transaction
        var transaction = db.transaction([storeName],"readonly");
        //ask the store
        var objectStore = transaction.objectStore(storeName);
        //get the cursor - for iterating oll the objects in the DB
        var cursor = objectStore.openCursor();
        //iterate
             let recordsList = [];
                 cursor.onsuccess = (r) =>{
                    let result = r.target.result;
                    if (result) {
                        //when the item exists - push it to the array
                        recordsList.push(result.value);
                        //continue iteration
                        result.continue();
                    } else {
                        //when all the items has been iterated - 
                        resolve(recordsList);
                    }
                }
        })
       
    }

//page 51
/****searching using indexes.You MUST to create an index 
 * at the beginning - when running a callbach 'onupgradeneeded'
 */
someObjStore.createIndex("name", "name", {unique:false});
/**function: searching all the names 
 * which begins from 'upper' to 'lower'
 * (for example found 'Anna' 'Boris' when upper='C' and lower='A') 
 */
 async function getByIndex (par={upper:'A', lower:'C'}) {
    return new Promise((resolve, reject) => {
        let result = [];
        let range;
        if(par.lower == "" && par.upper == "") {
            //if there are empty strings - return an empty array
            resolve ([]);
        }

        if(par.lower != "" && par.upper != "") {
            //if upper and lower exists
            range = IDBKeyRange.bound(par.lower, par.upper);
            } else if(par.lower == "") {
                //if upper exists
            range = IDBKeyRange.upperBound(par.upper);
            } else {
                //if lower exists
            range = IDBKeyRange.lowerBound(par.lower);
        }
        //start a transaction
        var transaction = db.transaction(["people"],"readonly");
        //ask the store
        var store = transaction.objectStore("people");
        //get an index for iteration
        var index = store.index("name");
        //start iteration using conditions
        index.openCursor(range).onsuccess=(e)=>{
            //get a result
            let cursor = e.target.result;
            if (cursor) {
                //if iteration running - push a reault in an array
                result.push(cursor.value);
                //continue iteration
                cursor.continue();
            }
        }

      /*  transaction.oncomplete=()=>{
            resolve(result);
        }*/
    });
}

/****FUNCTION_PREPARING***searching by properyy, that can be exists in a object
 * for example - search by hobby; We have an object 
 
 */

let myObj001={
  name:"John",
  hobbies:["tennis","sport","movies"],
  email:"my@mail.com",
  created: new Date().getDate(),
}

//for the first: create an index for searching in 'onupdateneeded' event
//at the begin
peopleOS.createIndex("hobbies", "hobbies", {unique:false, multiEntry: true});
//for the second: change a version or a name of the database
//for the thrid: write a function for the search
/****FUNCTION */
async function searchByHobbies(hobby='sport,bike') {
    //define a name of th storage
    const storeName = 'people';
  return  new Promise((resolve, reject) => {
        let result = [];
         //when the string empty - return an empty array
         if(hobby == "") {
            resolve(result);
         }
         //define a range for searching
         var range = IDBKeyRange.only(hobby);
         //start a transaction
         var transaction = db.transaction(["people"],"readonly");
         //ask a store
         var store = transaction.objectStore("people");
         //get  an index
         var index = store.index("hobbies");
         //start iteration
         let iteration = index.openCursor(range);
         //a callback when success 
         iteration.onsuccess=(e)=>{
            var cursor = e.target.result;
            if (cursor) {
                //if the iteration continues -
                //push a result into an array 
                result.push(cursor.value);
                //run next iteration
                cursor.continue();
            }
        }

        //when a transaction has been completed
       transaction.oncomplete=()=>{
            resolve(result);
        }

        transaction.onerror=(e)=>{
            alert(e);
            reject(e);
        }

    });
   
}

/***FUNCTION: when you need to count an amount of items in the store */
async function getNotesCount(evt){
    let result = 0;
    return new Promise((resolve, reject) => {
         //start a transaction
    let transaction = db.transaction(["notes"],"readonly");
    //ask a store 
    let store =  transaction.objectStore('notes');
        //count all the items
        let result = store.count();
        result.onsuccess=(event)=>{
            alert(event.target.result);
            resolve(event.target.result);
        }

    });
}



/******************************Another example************
 * ******************************************************
 * ****************************************************
 */

//1) try to open database
async function openBase () {
    return new Promise((resolve, reject) => {
        /**checking - is the IndexedDB supports by the browser? */
    if (! ("indexedDB" in window)) {
        alert('DB not supported!')
        reject();
    }
    //open DB
    let openRequest = indexedDB.open("mybase",1);
    /**the callback on update needed */
    openRequest.onupgradeneeded = (e) =>{
        console.log('UPDATE DB..')
        //get a DB
        let thisDB = e.target.result;
        /**if the objectStore 'users' exists? */
        if (!thisDB.objectStoreNames.contains("userStore")) {
            //create an object store, set primary key 
            var usersOS = thisDB.createObjectStore("userStore", {keyPath: "name"});
            //assign  indexes for searching and iterating
            //if we need that  'date' will be unique - set true
            //othervise - false 
            usersOS.createIndex("date", "date", {unique:false});
            //search in array
            usersOS.createIndex("hobbies","hobbies",{unique:false, multiEntry:true})
        }
    }

    openRequest.onsuccess=(e)=>{
        let db = e.target.result;
        resolve(db);
    }
    });
}

//1)save a user
async function saveUser ( arg = { name:"Emily", email:"b@c",hobbies:["sport"],date:"1999-01",}, db = globalIndexStorage, storeName = 'userStore',) {

    new Promise((resolve, reject) => {
        //start a transaction
        let transaction = globalIndexStorage.transaction([storeName],"readwrite");
        //get an object store
        let store = transaction.objectStore(storeName);
        //start a request
        var request = store.add(arg);
        request.onerror=(e)=>{
            console.log('ERROR during save')
            reject(e);
        }
        request.onsuccess =(e)=>{
            console.log(`A user ${arg.name} saved!`);
            resolve();
        }
    });
   
 }

 //2)update a user info 

 async function updateUser (arg = { name:"Emily", email:"b@c",hobbies:["sport"],date:"1999-01",}, db = globalIndexStorage, storeName = 'userStore', ) {

    return new Promise((resolve, reject) => {
        //start a transaction
        let transaction = db.transaction ([storeName],"readwrite");
        //ask a store
        let store = transaction.objectStore (storeName);
        //start a request
        var request = store.put(arg);

        request.onsuccess=(e)=>{
            console.log(`A user ${areg.name} updated!`)
            resolve(e);
        }

        request.onerror=(err)=>{
            console.log('Fail update:');
            reject(err)
        }

    });
}

//3) get info by the name
async function searchByName (arg ="Emily", db = globalIndexStorage, storeName = 'userStore', ) {
    return new Promise((resolve, reject) => {
        //sart a transaction
        let transaction = db.transaction([storeName],"readonly");
        //ask a store 
        let store = transaction.objectStore(storeName);
        //start a query
        var request = store.get(arg);
        request.onsuccess = (e) =>{
            if (!e.target.result) {
                resolve({});
            } else {
                resolve(e.target.result);
            }
        }
        request.onerror = (err) =>{
            console.error(err);
            reject(err);
        }
    });

}

//3) searching object by year
async function searchByYear ( arg ={from:'1999-01', to:'2022-06'}, db = globalIndexStorage, storeName = 'userStore',) {
    return new Promise((resolve, reject) => {
       //result
       let foundObjects = [];
       //init a transaction
       let transaction = db.transaction([storeName],"readonly");
       let store = transaction.objectStore(storeName);
       //set a range
       let range = IDBKeyRange.bound(arg.from, arg.to);
       //get index
       let index = store.index("date");
       //start iteration
         let cursor =  index.openCursor(range);
         cursor.onsuccess=(e)=>{
               let result = e.target.result;
               if (result) {
                   //save results in an array
                   foundObjects.push(result.value);
                   //next itreration start
                   result.continue();
               }
           }
           //when transaction has gone
       transaction.oncomplete=()=>{
           resolve(foundObjects);
       }
       
       transaction.onerror=(err)=>{
           alert('error')
           reject(err);
       }
    });
   }
//4) searching data by hobbies
async function searchByHobbies (arg ="sport,tourism", db = globalIndexStorage, storeName = 'userStore',) {
    return new Promise((resolve, reject) => {
        let response =[];
        //start a transaction
        let transaction = db.transaction([storeName],"readonly");
        //ask a store
        let store = transaction.objectStore(storeName);
        //define a range for search IDBKEy
        var range = IDBKeyRange.only(arg);
        //get an index
        let index = store.index("hobbies");
        //start iteration
        let iteration = index.openCursor(range);
        iteration.onsuccess = (e) =>{
            let result = e.target.result;
            if (result) {
                //save to the array
                response.push(result.value);
                //next iteration start
                result.continue();
            }
        }

        transaction.oncomplete=()=>{
            resolve(response);
        }

        transaction.onerror=(err)=>{
            reject(err);
        }
        //     
    });
}

//5)delete the user
async function deleteUser (arg ="Emily", db = globalIndexStorage, storeName = 'userStore', ) {
    return new Promise((resolve, reject) => {
        //start a transaction
        let transaction = db.transaction([storeName],"readwrite");
        //ask an objectStore
        let store = transaction.objectStore(storeName);

        let request = store.delete(arg);

        request.onsuccess=(e)=>{
            console.log('deleting sucessfull');
            resolve();
        }
        request.onerror=(er)=>{
            console.log('Error!');
            reject(er);
        }
    });
}

///6)find all the users

async function findAllTheUsers (db = globalIndexStorage, storeName = 'userStore') {
    return new Promise((resolve, reject) => {
          let recordlist = [];
          //start  transaction
          let transaction = db.transaction([storeName],"readonly");
          //ask a store
          let store = transaction.objectStore(storeName);
          //open a cursor - for iteration
          let cursor = store.openCursor();
          cursor.onsuccess=(r)=>{
              let result = r.target.result;
              if (result) {
                  //when an iteration in action
                  recordlist.push(result.value);
                  //new iteration start
                  result.continue();
              }
          }
          //when a transaction completed
          transaction.oncomplete=()=>{
              resolve(recordlist);
          }
  
          transaction.onerror=(err)=>{
              reject(err);
          }
  
    });
  
  }
  //7) get an amount of users
  async function getUsersCount (db = globalIndexStorage, storeName = 'userStore') {
    return new Promise((resolve, reject) => {
        let count = 0;
        //start a transaction
        let transaction = db.transaction([storeName],"readonly");
        //ask a store
        let store = transaction.objectStore(storeName);
        let result = store.count();
        result.onsuccess=(e)=>{
            count = e.target.result;
        }
        transaction.oncomplete=()=>resolve(count)

    });
}
