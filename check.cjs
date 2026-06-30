const fs = require('fs');

const path = 'd:\\Web\\web page\\iqraWebPage\\public\\Gemini_Generated_Image_7gxx9h7gxx9h7gxx.png';
const buffer = fs.readFileSync(path);

// PNG width/height are 4 bytes each at offsets 16 and 20
const width = buffer.readUInt32BE(16);
const height = buffer.readUInt32BE(20);

console.log(`Dimensions: ${width}x${height}`);
