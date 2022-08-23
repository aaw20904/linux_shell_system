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
  
  
