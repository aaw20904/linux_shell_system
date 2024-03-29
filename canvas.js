
/*
█▀▄ █▀█ ▄▀█ █░█░█   █░░ █ █▄░█ █▀▀
█▄▀ █▀▄ █▀█ ▀▄▀▄▀   █▄▄ █ █░▀█ ██▄
*/
///---get context
const ctx = canvas.getContext('2d');
///---set parameters to drawing
ctx.strokeStyle="green";
ctx.lineWidth=6;
 //----Lines can have one of three cap styles: butt (default), round, or square
ctx.lineCap = 'square';

ctx.beginPath();
 ctx.moveTo(10,10);
 ctx.lineTo(60,100);
 ctx.stroke();
/*
█▀▄ █▀█ ▄▀█ █░█░█   ▄▀█ █▀█ █▀▀
█▄▀ █▀▄ █▀█ ▀▄▀▄▀   █▀█ █▀▄ █▄▄
*/
ctx.beginPath();
 ctx.arc (110,150, 20,0, 3.14);
 ctx.stroke();
/*
█▀█ █░█ ▄▀█ █▀▄ █▀█ ▄▀█ ▀█▀ █ █▀▀   █▀▀ █░█ █▀█ █░█ █▀▀
▀▀█ █▄█ █▀█ █▄▀ █▀▄ █▀█ ░█░ █ █▄▄   █▄▄ █▄█ █▀▄ ▀▄▀ ██▄
*/
  context.beginPath();
  context.moveTo(188, 150);
  context.quadraticCurveTo(288, 0, 388, 150);
  context.stroke();
/*
█▀▀ █░█ █▀ ▀█▀ █▀█ █▀▄▀█   █▀ █░█ ▄▀█ █▀█ █▀▀
█▄▄ █▄█ ▄█ ░█░ █▄█ █░▀░█   ▄█ █▀█ █▀█ █▀▀ ██▄
*/
  context.moveTo(170, 80);
  context.bezierCurveTo(130, 100, 130, 150, 230, 150);
  context.bezierCurveTo(250, 180, 320, 180, 340, 150);
  context.bezierCurveTo(420, 150, 420, 120, 390, 100);
  context.bezierCurveTo(430, 40, 370, 30, 340, 50);
  context.bezierCurveTo(320, 5, 250, 20, 250, 50);
  context.bezierCurveTo(200, 5, 150, 20, 170, 80);
      // complete custom shape
  context.closePath();

/*
█▀█ █▀▀ █▀▀ ▀█▀ ▄▀█ █▄░█ █▀▀ █░░ █▀▀
█▀▄ ██▄ █▄▄ ░█░ █▀█ █░▀█ █▄█ █▄▄ ██▄*/
     context.beginPath();
      context.rect(188, 50, 200, 100);
      context.fillStyle = 'yellow';
    //---fill inner area of a rect
      context.fill();
      context.lineWidth = 7;
      context.strokeStyle = 'black';
    //---draw rectangle
      context.stroke();

/*

█▀▀ █▀█ ▄▀█ █▀▄ █ █▀▀ █▄░█ ▀█▀   ▄▀█ █▀   █▀▀ █ █░░ █░░
█▄█ █▀▄ █▀█ █▄▀ █ ██▄ █░▀█ ░█░   █▀█ ▄█   █▀░ █ █▄▄ █▄▄
*/
     // add LINEAR gradient- 
      var grd = ctx.createLinearGradient(188, 50, 200, 100);
      // light blue
      grd.addColorStop(0, '#8ED6FF');   
      // dark blue
      grd.addColorStop(1, '#004CB3');
      ctx.fillStyle = grd;

///or add RADIAL gradient-
    // create radial gradient
      var grd = context.createRadialGradient(238, 50, 10, 238, 50, 300);
      // light blue
      grd.addColorStop(0, '#8ED6FF');
      // dark blue
      grd.addColorStop(1, '#004CB3');
      context.fillStyle = grd;

//or load a custom P A T T E R N  - for example an image:

      var imageObj = new Image();
      imageObj.onload = function() {
        var pattern = ctx.createPattern(imageObj, 'repeat');

        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = pattern;
        ctx.fill();
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';

/*

█▀▄ █▀█ ▄▀█ █░█░█   █ █▀▄▀█ ▄▀█ █▀▀ █▀▀
█▄▀ █▀▄ █▀█ ▀▄▀▄▀   █ █░▀░█ █▀█ █▄█ ██▄
*/
   var imageObj = new Image();

      imageObj.onload = function() {
       //optional - ajusting size of the canvas
        canvas.width = imageObj.width+5;
        canvas.height = imageObj.height+5;
       //-----draw an image by default
        ctx.drawImage(imageObj, 0, 0);
       //---or draw an image with scalling
        var width = 64;
         var height = 40;
        ctx.drawImage(imageObj, 0, 0, width, height);
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

    /* To C R O P  (draw a pice of existing image)   using HTML5 Canvas, we can add six additional arguments
    to the drawImage() method, sourceX, sourceY, sourceWidth, sourceHeight, destWidth and destHeight. */
      var imageObj = new Image();

      imageObj.onload = function() {
        // draw cropped image
        var sourceX = 150;
        var sourceY = 0;
        var sourceWidth = 150;
        var sourceHeight = 150;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = canvas.width / 2 - destWidth / 2;
        var destY = canvas.height / 2 - destHeight / 2;

        ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
      };
   /*
   
▀█▀ █▀▀ ▀▄▀ ▀█▀
░█░ ██▄ █░█ ░█░
   */
      ctx.textAlign = 'left';  //it may be start, end, left, center, or right
     // textBaseline aligns text vertically relative to font style
      ctx.textBaseline = 'middle';  //it may be top, hanging, middle, alphabetic, ideographic, and bottom.
      ctx.lineWidth=2;
      ctx.font =  '60pt Calibri';
      ctx.fillStyle = 'blue'
  ///draw fill text
      ctx.fillText('Hello World!', 150, 100);
//or stroke text (contour)
       ctx.strokeText('Hello World!', 150, 150);
/*
█▀▄▀█ █▀▀ ▄▀█ █▀ █░█ █▀█ █▀▀   ▀█▀ █▀▀ ▀▄▀ ▀█▀
█░▀░█ ██▄ █▀█ ▄█ █▄█ █▀▄ ██▄   ░█░ ██▄ █░█ ░█░
*/
 // get text metrics
     var text = "Helo Word"
      var metrics = context.measureText(text);
//'metrics' object contaings several properties
      var width = metrics.width;
