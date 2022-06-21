////P W A 
/*to make PWA you can create a manifest file  and add the one to the HTMLK string*/
/***********FILE: app.webmanifest*******/
{
    "short_name": "TipCalc",
    "name": "Tip Calculator",
    "icons": [
        {
            "src": "icons/android-icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icons/android-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
        "start_url": "/index.html?source=pwa",
        "display": "standalone",
        "background_color": "#FFFFFF",
        "theme_color": "#3653B3"
    }
/********FILE: index.html*******/
/*<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Tip Calculator (2)</title>  
  <meta name="description" content="A simple tip calculator app">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="app.webmanifest">
  <!-- favicon generated by: https://www.favicon-generator.org/ -->
  <!-- icon image: https://thenounproject.com/search/?q=34839&i=34839 -->
  <link rel="apple-touch-icon" sizes="57x57" href="icons/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="icons/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="icons/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="icons/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="icons/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="icons/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="icons/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="icons/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192" href="icons/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="icons/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="css/normalize.css">
  <!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

  <link rel="stylesheet" href="css/main.css">
</head> */

// **************S E R V I C E   W O R K E R ****************************
//1) register in main.js

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      // регистрация сработала
      console.log('Registration succeeded. Scope is ' + reg.scope);
	  /*если новая версия воркера была зарегистрирована*/
	  navigator.serviceWorker.addEventListener('controllerchange', () => {
		console.log("Hmmm, we’re operating under a new service worker");
		});
    })
    .catch((error) => {
      // регистрация прошла неудачно
      console.log('Registration failed with ' + error);
    });

  }
  
  /*1.1) Альтернатива - автоматический апгрейд воркера через промежутки времени
*/
// define a variable to hold a reference to the
// registration object (reg)
var regObject;
// does the browser support service workers?
   if ('serviceWorker' in navigator) {
		// then register our service worker
		navigator.serviceWorker.register('/sw.js')
		.then(reg => {
			// display a success message
			console.log(`Service Worker Registration (Scope: ${reg.scope})`);
			// Store the `reg` object away for later use
			regObject = reg;
			//время для апгрейда воркера через сеть
			// setup the interval timer
			setInterval(requestUpgrade, 600000);
		})
		.catch(error => {
			// display an error message
			let msg = `Service Worker Error (${error})`;
			console.error(msg);
			// display a warning dialog (using Sweet Alert 2)
			Swal.fire('Registration Error', msg, 'error');
		});
	} else {
	// happens when the app isn't served over a TLS connection
	// (HTTPS) or if the browser doesn't support service workers
	console.warn('Service Worker not available');
	// we're not going to use an alert dialog here
	// because if it doesn't work, it doesn't work;
	// this doesn't change the behavior of the app
	// for the user
	}
	//функция апгрейда
	function requestUpgrade(){
		console.log('Requesting an upgrade');
		regObject.update();
	}

//2)  sw.js
/*********************************************************
 * Listing 3.8
 * 
 * this is a simple Service Worker that simply logs the 
 * request to the console, then returns a promise to 
 * fetch the requested file. It forces the worker
 * to activate through the use of `skipWaiting()` and
 * adds a call to `self.clients.claim()` to claim all tabs
 *********************************************************/

self.addEventListener('install', event => {
    // fires when the browser installs the app
    // here we're just logging the event and the contents
    // of the object passed to the event. the purpose of this event
    // is to give the service worker a place to setup the local 
    // environment after the installation completes.
    console.log(`SW: Event fired: ${event.type}`);
    console.dir(event);

		//!! после загрузки новой версии воркера (например при обновлении сайта из тнтернета и если новый воркер отличается 
		//от текущего ) браузер НЕ завершает роботу текущего воркера, но ставит новый воркер в очередь ожидания
		//и пока не будет закрыт браузер обновление не наступит. Чтобы форсировать активацию:
    // force service worker activation
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // fires after the service worker completes its installation. 
    // it's a place for the service worker to clean up from previous 
    // service worker versions
    console.log(`SW: Event fired: ${event.type}`);
    console.dir(event);
	/*
	в некоторых случаях пользователь может иметь несколько одинаковых открытых странц 
	вашего приложения или сайта.Чтобы назначить новый воркер для всех этих страниц: 
	*/
    // apply this service worker to all tabs running the app
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // fires whenever the app requests a resource (file or data)
    console.log(`SW: Fetching ${event.request.url}`);
    // next, go get the requested resource from the network, 
    // nothing fancy going on here.
    event.respondWith(fetch(event.request));
});

//---------------------------------###-------------------
//---------------------------CACHING a CONTENT-Rev.1-(plese see next rev.!)----------
/**
 * When you want to load a content into cache and prevent 
 * load resources from the server when offline.
 * After start the service worker load into cahce resources from the list
 * When a browser fetch any resource - the worker test: is this resource in a cache?
 * If the resource have been found - it returns to a browser from the cache.
 * When not - from the network  
 */

// service worker version number
const SW_VERSION = 8;
// the root name for our cache
const CACHE_ROOT = 'pwa-learn-cache';
// generates a custom cache name per service worker version
const CACHE_NAME = `${CACHE_ROOT}-v${SW_VERSION}`;



var urlList = [
  
  '/app.webmanifest',
   
  '/css/main.css',
  '/css/bootstrap.min.css',
  '/img/cat_270.jpg',
  '/img/cat_540.jpg',
  '/img/cat_1080.jpg',
  '/img/tip-200.png',
  '/favicon32x32.png',
  '/favicon.ico',
  '/js/main.js',
  '/sw.js',
  '/icons/msicon144x144.png',
  'css/normalize.css',
];

self.addEventListener('install',async (event)=>{
  console.log(`Worker- ${event.type} fired!`);
  //// the service worker is installing, so it's our chance
  // to setup the app. In this case, we're telling   
  // the browser to wait until we've populated the cache
  // before considering this service worker installed
  //this method expects a promise
  await event.waitUntil(prepareCache());
   // force service worker activation
   self.skipWaiting();
   
})

self.addEventListener('activate',(event)=>{
  // fires after the service worker completes its installation. 
  // it's a place for the service worker to clean up from previous 
  // service worker versions
  console.log(`SW: ${event.type} event fired`);
  //remove old caches if exists
  event.waitUntil(removeOldCaches(event));
})


async function removeOldCaches (event) {

  let cacheList = await caches.keys();
  return await Promise.all(
    cacheList.map(theCache=>{
      // is the cache key different than the 
          // current cache name and has the same root?
          if ((CACHE_NAME !== theCache) && (theCache.startsWith(CACHE_ROOT))) {
            // yes? Then delete it. 
            console.log(`SW: deleting cache ${theCache}`);
            return caches.delete(theCache);
          }

    })
  )

 }
 /**function for open a cache */
 async function prepareCache() {
  //*create a locale cache for the app
  try {
    let cache = await caches.open(CACHE_NAME  )
    console.log('SW cache opened');
    //load all the resource into cache
    return cache.addAll(urlList);
  }
  catch(err){
    console.log('error:'+ err);
    throw new Error(err);
  }
}

self.addEventListener('fetch',event=>{
  console.log(`Worker: ${event.type} ${event.request.url}`);
 //if there is 'indeex.html'
  if (event.request.url === `${location.origin}/`) {
    event.respondWith(indexFetching(event));
    return;
  }
 //if there an api route '/w'
  if (event.request.url === `${location.origin}/w`) {
    event.respondWith(apiRoute(event));
    return;
  }

  event.respondWith( searchRequestInCache(event) );
})

async function indexFetching(event) {
  let result;
  try{
    //if the index.html avaliable - fetch the one
    result = await fetch(event.request);
    return result;
  } catch(e) {
    //if the page havn`t loaded - return content
    return new Response(
      "<!DOCTYPE html><html><body style='background-color:#ddffdd;'>" +
      "<h1 style='color:tomato'>Access Error</h1>" +
      "<h3 style='color:orange'>Service Worker message</h3>" +
      "<p>Hmmm, I can't seem to access that page.</p>" +
      "</body></html>",
      { headers: { "Content-Type": "text/html" } })
  }
}

async function apiRoute(event) {
    //is a resource a POST API request for AJAX?
      //in our example it is '/w'
     
        let rsp;
        try {
          //try to get (post) a resource from (to) the server
          rsp = await fetch(event.request);
          return rsp;
        } catch(e) {
          console.log('SW: catch-create a local response')
          //if there was something wrong - NOT AVALIABLE 404
          return new Response(JSON.stringify({information: 0.00001}),
              { "status": 200, });
        }
     
}


/**response function for static resources*/
async function searchRequestInCache(event) {
    
      //is the resource in a cache?
    let response = await caches.match(event.request)
     
        //if YES - return the cache
        if (response) {
          console.log(`worker: ${new Date().toLocaleTimeString()} returned Cache ${event.request.url} `);
          return response;
        } else {
          //othervise - return a resource from the network
          console.log(`Worker: network request ${event.request.url} `);
          return fetch(event.request);
        }
      
 
}

