## getting user media
```javascript
<code>
 const getstreamAndAssignToVideoElement = async () =>{
    try{
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            var video = document.querySelector('video');
            video.srcObject = stream;
    }catch(e){
        alert(e);
    }
  
 }
</code>
## take a picture from video

const takePicureFromVdeo = async () =>{
    let streaming = false;
    var canvas = document.querySelector('canvas');
     var video = document.querySelector('video');
    var takePictureButton =  document.querySelector("#capture");

        const takePicture = () =>{
                if (streaming) {
                    canvas.width = video.clientWidth;
                    canvas.height = video.clientHeight;
                    var context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0);
                }
            }

   takePictureButton.addEventListener('click',takePicture);
    try{    
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = stream;
            streaming = true;
    }catch(e){
        alert(e);
    }
  
 }
