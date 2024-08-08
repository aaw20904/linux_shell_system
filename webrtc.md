** getting user media
```javascript
 const getstreamAndAssignToVideoElement = async () =>{
    try{
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            var video = document.querySelector('video');
            video.srcObject = stream;
    }catch(e){
        alert(e);
    }
  
 }
