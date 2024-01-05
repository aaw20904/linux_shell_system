
/*

█▄▄ █░░ █▀█ █▄▄
█▄█ █▄▄ █▄█ █▄█

It is a lighthweight structure, that allows store manipulate large volume of data in various formats.
It allows store chunks of data effectively and therefore suitable for large files.  
The structure.
*/

/*You can crteate a blob from an array. */
let blob = new Blob(["<html>…</html>"], {
	type: 'text/html'
});
//------------PROPERTIES:

    blob.size   //size of blob in bytes - readonly
    blob.type  //MIME type of represented data - readonly

//-------M E T H O D S:
/ *1) Converts into ArrayBuffer (returns Promise)  */
      
    blob.ArrayBuffer()

/* 2) Returns a new Blob as slice of existing.
  There are avaliable 4 prototypes:  */

    blob.slice();
    blob.slice(start);
    blob.slice(start, end);
    blob.slice(start, end, contentType);

/* 3)Returns a readable stream:  */

    blob.stream()

