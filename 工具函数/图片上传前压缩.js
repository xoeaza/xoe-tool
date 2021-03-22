// 使用canvas生成新图片
export function compressUpload(image, file, tartetSize) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let { width, height } = image;
  let defaultRatio = 0.92;
  canvas.width = width;
  canvas.height = height;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, width, height);
  let currentSize = file.size;
  let blobImg;
  while (currentSize > tartetSize) {
    const compressData = canvas.toDataURL('image/jpeg', defaultRatio);
    blobImg = dataURItoBlob(compressData);
    currentSize = blobImg.size;
    defaultRatio -= 0.1;
  }
  return blobImg;
}

// base64转Blob对象
export function dataURItoBlob(data) {
  let byteString;
  if (data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(data.split(',')[1]);
  } else {
    byteString = unescape(data.split(',')[1]);
  }
  let mimeString = data.split(',')[0].split(':')[1].split(';')[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

// 图片上传前压缩
const compressImg = (file: any) => {
  const { name, size } = file;
  const isLt1M = size / 1024 / 1024 < 1;
  if (isLt1M) return file;

  let image = new Image();
  image.src = window.URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const resultBlob = compressUpload(image, file, 1 * 1024 * 1024);
      const newFile = new File([resultBlob], name, {
        type: 'image/jpeg'
      });
      resolve(newFile);
    };
  });
};

// 具体使用
const compressedFile = await compressImg(file);
