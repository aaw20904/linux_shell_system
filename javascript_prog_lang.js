
/*

█▄▄ █░░ █▀█ █▄▄
█▄█ █▄▄ █▄█ █▄█

It is a lighthweight structure, that allows store manipulate large volume of data in various formats.
It allows store chunks of data effectively and therefore suitable for large files.  
The structure.
*/

new Blob(blobParts);
new Blob(blobParts, options);

/* The first parameter must be iterable,
the second has two optional fields:
{type ,endings}, "type" contains MIME type*/

//------------PROPERTIES:

    blob.size   //size of blob in bytes - readonly
    blob.type  //MIME type of represented data - readonly

//-------M E T H O D S:
/ *1) Converts into ArrayBuffer (returns Promise)  */
      
    blob.ArrayBuffer();

/* 2) Returns a new Blob as slice of existing.
  There are avaliable 4 prototypes:  */

    blob.slice();
    blob.slice(start);
    blob.slice(start, end);
    blob.slice(start, end, contentType);

/* 3)Returns a readable stream:  */

    blob.stream();

/* 4)Converting a blob to UTF-8 string. Returns promise */

   blob.text();

/*

/*
█▄▄ █▀█ █▀█ █░█░█ █▀ █▀▀ █▀█   █▀▀ █ █░░ █▀▀   █ █▄░█ █▀█ █░█ ▀█▀
█▄█ █▀▄ █▄█ ▀▄▀▄▀ ▄█ ██▄ █▀▄   █▀░ █ █▄▄ ██▄   █ █░▀█ █▀▀ █▄█ ░█░
*/

// You can have acces to file/ file list using "change" event:
 htmlInput.addEventListener("change", (input)=>{
	 console.log(input.files[0]);
 });
//The file objects have the same properties as the instance of Blob

█▀▀ █ █░░ █▀▀  █▀█ █▀▀ ▄▀█ █▀▄ █▀▀ █▀█
█▀░ █ █▄▄ ██▄  █▀▄ ██▄ █▀█ █▄▀ ██▄ █▀▄
*/
 ///constructor 
	FileReader();
//instance properties:
	FileReader.error;
	FileReader.readyState; 
	FileReader.result;
//METHODS:
	FileReader.result();
//Reads data. Parameter - is the Blob or File from which to read.
	FileReader.readAsArrayBuffer(blob);
//
	FileReader.readAsDataURL(blob);
//
	readAsText(blob);
	readAsText(blob, encoding);
/*---------- E V E N T S -------*/
 // "abort" - fired when a read has been aborted
	 addEventListener("abort", (event) => {});
	 reader.onabort = (event) => {};
// "error" 
	addEventListener("error", (event) => {});
	onerror = (event) => {};
// "load" - The load event is fired when a file has been read successfully.
	addEventListener("load", (event) => {});
	onload = (event) => {};
        //you can read loaded data  from the FileReader.result property

//"loadend"  The loadend event is fired when a file read has completed, successfully or not.
	addEventListener("loadend", (event) => {});
	onloadend = (event) => {};
//The "loadstart" event is fired when a file read operation has begun.
// The "progress" event is fired periodically as the FileReader reads data.

/* 

█▀ █▄░█ █ █▀█ █▀█ █▀▀ ▀█▀   ▄▄   █▀█ █▀▀ ▄▀█ █▀▄   █▄▄ █▄█   █▀▀ █░█ █░█ █▄░█ █▄▀ █▀
▄█ █░▀█ █ █▀▀ █▀▀ ██▄ ░█░   ░░   █▀▄ ██▄ █▀█ █▄▀   █▄█ ░█░   █▄▄ █▀█ █▄█ █░▀█ █░█ ▄█
*/

async function onChange (input) {
  const chSize = 128;
  let file = input.files[0]
  console.log(file);
  
  //file.size
  //an amounts of chunks
  let currentPos = 0;
  let chunks = file.size / chSize;
  if (chunks < 1) {
    chunks = 1;
  }  
  for (let idx=0; idx<chunks; idx++) {
      let slice = file.slice(currentPos, currentPos+chSize);
      currentPos += chSize;

      let returned = await new Promise((resolve, reject) => {
          let reader = new FileReader ();
            reader.onload = function () {
              resolve(reader.result);
            }
          reader.readAsText(slice);
      });

      console.log(`<<<<${idx}>>>>${returned}`);

  
  }








