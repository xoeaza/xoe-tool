// 获取图片的旋转角度信息
//通过摄像头拍摄的图片才有exif信息
getOrientation(file) { 
  return new Promise((resolve, reject) => {   
      const img = new Image();    
      img.src = window.URL.createObjectURL(file);    
      img.onload = () => {      
         // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）     
         exif.EXIF.getData(img, function () {        
         // 获取图片旋转标志位        
         let orientation = exif.EXIF.getTag(this, "Orientation");        
         resolve(orientation || 1)      
       })    
      }    
     img.onerror = (err) => {      
       reject(err)    
      }  
 })}

// 绘制旋转图片
function drawImage(img, orientation, x, y, width, height) {
  if (!/^[1-8]$/.test(orientation)) throw new Error('orientation should be [1-8]');

  if (x == null) x = 0;
  if (y == null) y = 0;
  if (width == null) width = img.width;
  if (height == null) height = img.height;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  ctx.save();
  switch (+orientation) {
    // 1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
    case 1:
        break;

    // 2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.
    case 2:
       ctx.translate(width, 0);
       ctx.scale(-1, 1);
       break;

    // 3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.
    case 3:
        ctx.translate(width, height);
        ctx.rotate(180 / 180 * Math.PI);
        break;

    // 4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.
    case 4:
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;

    // 5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.
    case 5:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(90 / 180 * Math.PI);
        ctx.scale(1, -1);
        break;

    // 6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.
    case 6:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(90 / 180 * Math.PI);
        ctx.translate(0, -height);
        break;

    // 7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.
    case 7:
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(270 / 180 * Math.PI);
        ctx.translate(-width, height);
        ctx.scale(1, -1);
        break;

    // 8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.
    case 8:
        canvas.width = height;
        canvas.height = width;
        ctx.translate(0, width);
        ctx.rotate(270 / 180 * Math.PI);
        break;
  }

  ctx.drawImage(img, x, y, width, height);
  ctx.restore();

  return canvas;
}