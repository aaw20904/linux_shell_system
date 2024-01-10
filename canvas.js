
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
