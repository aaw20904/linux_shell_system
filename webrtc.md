**getting user media
```javascript
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream=>{
        var video = document.querySelector('video');
        video.srcObject = stream;
    }).catch(err=>{
        alert(err);
    });
