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
  
  