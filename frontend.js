//***create a button like an image***/
  //a button
        let btn  = document.createElement('input');
        btn.setAttribute('type','image');
        btn.setAttribute('src','../images/close.png');
        btn.setAttribute('style','height:30;width:30;');

/******Buffer (Array) to Base64****************/
function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}


function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

//***BOOTSTRAP validation template****/
//all the validation runs inside bootstrap script
<form action="/action_page.php" class="was-validated">
    <div class="mb-3 mt-3">
      <label for="uname" class="form-label">Username:</label>
      <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required>
      <div class="valid-feedback">OK</div>
      <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="mb-3">
      <label for="pwd" class="form-label">Password:</label>
      <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required>
      <div class="valid-feedback">OK.</div>
      <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" id="myCheck"  name="remember" required>
      <label class="form-check-label" for="myCheck">I agree on blabla.</label>
      <div class="valid-feedback">OK</div>
      <div class="invalid-feedback">Check this checkbox to continue.</div>
    </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>

///you can also change a button to type='button' to send a post message from the script 
 //and call  form.checkValidity();

/*******SCALLING IMAGE ***/

////DOM elems
 <label for="avatar" class="form-label maintextcolor">Avatar image:</label>
 <input type="file" value="Choose JPG File" class="form-control maintextcolor" id="avatar"  placeholder="Select an image- your avatar" name="avatar"  accept="image/*"  required/>
///function
function readFile () {
    return new Promise((resolve, reject) => {
            // (A) GET SELECTED FILE
            let imageFile = document.getElementById("avatar").files[0];
                // (B) READ SELECTED FILE
            let reader = new FileReader();
            //start read
            reader.readAsDataURL(imageFile);
            //error event handler
            reader.addEventListener('error', (x)=>reject(x));
            //load event handler
            reader.addEventListener("load", (e) => {
                let currentImageData = e.target.result;
                  //create an image
                let img= document.createElement('img');
                  //assign reading result to the one
                img.src =  e.target.result;
                    //when an image has  loaded
                img.onload=(event)=>{
                    // Dynamically create a canvas element
                       var canvas = document.createElement("canvas");
                    //actual resizing
                        var ctx = canvas.getContext("2d");
                    console.log(`Image wh: ${img.width},${img.height}`);
                      //calculate aspect ratio
                    let aspectRatio = img.width / img.height;
                      //calculate a new height
                    let newWidth = (150 * aspectRatio) | 0;
                      //set canvas sizes
                    ctx.canvas.width=newWidth;
                    ctx.canvas.height=150;
                      // Actual resizing
                     ctx.drawImage(img, 0, 0, newWidth, 150);
                      //  convert to 'DataUrl' and assign it to a variable
                    var dataurl = canvas.toDataURL(imageFile.type);
                      //OPTIONAL: show a result in DOM img element
                    document.getElementById("demoShow").src = dataurl;
                    //return a scaled image
                    resolve( dataurl);
                }

            });
        
    });

}
/********SERVICE WORKER**********/
//lifecycle - I)registration
	if (! ('serviceWorker' in navigator)) {
		console.error('SW not supported!');
		return;
	}

	navigator.serviceWorker.register('/service-worker.js')
	.then( function(registration) {
		console.log('SW registered! Scope is:',registration.scope);
	});
	.catch(e=>{/*handle a registration error*/});
//*********II) installation***
	self.addEventListener('install', function(event) {
		//do thomething in time of installation
	});
/*EVENTS - install, activate
FUNCTIONAL EVENTS - fetch, sync, push
*/
/*. So, if we want to cache assets, it is a good time
to do that during the install state by listening to the install event
*/


//var options = {}
self.addEventListener('push',
 (event)=>{
	 event.waitUntil( self.registration.showNotification('Hello!',options));
  }
  )
  
  
