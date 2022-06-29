/*******************IndexedDB******************************/
/**for the start you can checking - is the browser supporting IndexeDB?*/


if (! ("indexedDB" in window) ) {
    alert('indexedDB not supported!');
    return; 
    //No support? Go in the corner and pout.
}
/**********************************
*****if there is OK, try to open (or create ) a DB*/
//open the database (name and version)
var openRequest = indexedDB.open("ora_idb5",2);
//if there a newer version of DB
openRequest.onupgradeneeded = function(e) {
    var thisDB = e.target.result;
    console.log("running onupgradeneeded");
    if (!thisDB.objectStoreNames.contains("people")) {
        //if there isn`t a store 'people' - create it, 
        //asign a property 'keyPath' - it will be using as a primary key
        var peopleOS = thisDB.createObjectStore("people",{keyPath: "email"});
    }
    if (!thisDB.objectStoreNames.contains("notes")) {
        //if there isn`t a store 'notes' - create the one
        //the primaryKey - auto assign and increment 
        var notesOS = thisDB.createObjectStore("notes", {keyPath:"id",autoIncrement:true} );
    }
}

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
//Get a transaction
//default for OS list is all, default for type is read
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
        //get the cursor - to iterate oll the objects in the DB
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