const ffmpeg = require('fluent-ffmpeg');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require("path")

// Spesifikasi video
const videoWidth = 1280;
const videoHeight = 720;
const videoFPS = 30;

// Buat kanvas untuk gambar
const canvas = createCanvas(videoWidth, videoHeight);
const ctx = canvas.getContext('2d');

// Atur properti kanvas
ctx.fillStyle = 'white';
ctx.font = '48px Arial';

// Fungsi untuk mengganti latar belakang
module.exports = function () {
  const background = loadImage(path.join(__dirname, `./../../assets/img/bg1.png`));
  background.then((image) => {
    ctx.drawImage(image, 0, 0, videoWidth, videoHeight);
    renderTextAndCreateVideo();
  });
}

// Fungsi untuk merender teks dan membuat video
function renderTextAndCreateVideo() {
  // Gambar teks ke kanvas
  ctx.fillText(`
MENU
--------------------------
- push
- pull
- apa

`, 100, 100);

  // Simpan kanvas sebagai gambar PNG
  const imageBuffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, './../../output/img/canvas.png'), imageBuffer);

  // Buat video
  ffmpeg()
    .input(path.join(__dirname, './../../output/img/canvas.png'))
    .input(path.join(__dirname, './../../assets/mp3/lagu.mp3'))
    // .inputFPS('30')
    // .videoBitrate('5000k')
    // .audioBitrate('128k')
    // .size(`${videoWidth}x${videoHeight}`)
    // .fps(30)
    // .audioCodec('acc')
    .videoCodec('libx264')
    .output(path.join(__dirname, './../../output/video/output.mov'))
    .on('end', () => {
      console.log('Video berhasil dibuat.');
      process.exit()
    })
    .run();
}

