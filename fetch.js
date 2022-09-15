
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


