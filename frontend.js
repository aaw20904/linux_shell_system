/*******SCALLING IMAGE ***/

////DOM elems
 <label for="avatar" class="form-label maintextcolor">Avatar image:</label>
 <input type="file" value="Choose JPG File" class="form-control maintextcolor" id="avatar"  placeholder="Select an image- your avatar" name="avatar"  accept="image/*"  required/>
///function
function convert (){
return new Promise((resolve, reject) => {
            // (A) GET SELECTED FILE
            let imageFile = document.getElementById("avatar").files[0];
                // (B) READ SELECTED FILE
            let reader = new FileReader();
            reader.addEventListener("load", (e) => {
                let currentImageData = e.target.result;
                //create an image
                let img= document.createElement('img');
                img.onload=(event)=>{
                    // Dynamically create a canvas element
                       var canvas = document.createElement("canvas");
                       canvas.widtth=100;
                        canvas.height=100;
                    //actual resizing
                        var ctx = canvas.getContext("2d");
                         ctx.canvas.width=100;
                         ctx.canvas.height=100;
                    console.log(`Image wh: ${img.width},${img.height}`);
                    // Actual resizing
                         ctx.drawImage(img, 0, 0, 100, 100);
                        
                    //  convert to 'DataUrl' and assign it to a variable
                        var dataurl = canvas.toDataURL(imageFile.type);
                        document.getElementById("demoShow").src = dataurl;
                    console.log(`Image wh: ${img.width},${img.height}`);
                          resolve( dataurl);
                }
                img.src =  e.target.result;
                reader.onerror=x=>reject(x);
             // sendDataToServer(null,y);
             //   document.getElementById("demoShow").src = reader.result;

            });
        reader.readAsDataURL(imageFile);
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
  
  
