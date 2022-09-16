
/***REDIRECT BROWSER*********/
//most relaible method!
  window.location.replace(`${currentUrl.protocol}//${currentUrl.hostname}/login${currentUrl.port}`);
/**************using   fetch()  function of browser****/
 //CASE 1 - JSON
//define the adress - where you want to send
 const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`

    const options={
      headers:{"Content-type":"application/json;charset=utf-8"},
      body:JSON.stringify({clientData: new Date().toLocaleTimeString()}),
      method:'post'
    }

    //send the request
    let response = await fetch(`${baseUrl}/w`,options);
    let result;
    if(response.ok) {
      //if there OK - read JSON data
      result= await response.json();
        document.querySelector('#textOut').innerText = JSON.stringify(result);
    } else {
      console.error(`Error ${response.status}`);
    }
/******CASE 2:  send urlencoded****/
//data to sending
   var details = {
    'userName': 'test@gmail.com',
    'password': 'Password!',
    'grant_type': 'password',
    'time': new Date().toLocaleTimeString()
};

const options =  {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  //converting to urlencoded
  body: new URLSearchParams(details)
}

let result = await fetch(`${baseUrl}/w`,options);
let urlenc = await result.json({extended:true});
  document.querySelector('#textOut').innerText = JSON.stringify(urlenc);
/****USING xmlHttpRequest()******/

async _sendCommand(data, command) {
     return   new Promise((resolve, reject) => {
                //define the adress - where you want to send
                const currentUrl = new URL(document.location.href)
                let resp_;
                // current base URL
                // url = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`;
                let  url = `${currentUrl.protocol}//${currentUrl.hostname}/admin/command${currentUrl.port}`;
                var xhr = new XMLHttpRequest();

                // listen for `load` event
                xhr.onload = () => {

                    // print JSON response
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // parse JSON
                        const response = JSON.parse(xhr.responseText);
                        console.log(response);
                        resolve(response);
                    }
                };

                //when error
                xhr.onerror = (e) => {
                    resolve({status:false,msg:e})
                }

                // create a JSON object
                const json = {
                    "data": data,
                    "command": command
                };

                // open request
                xhr.open('POST', url);

                // set `Content-Type` header
                xhr.setRequestHeader('Content-Type', 'application/json');

                // send rquest with JSON payload
                xhr.send(JSON.stringify(json));      
        });


    }

