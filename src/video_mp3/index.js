const ffmpeg = require('fluent-ffmpeg');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Spesifikasi video
const videoWidth = 1280;
const videoHeight = 720;
const videoFPS = 30;

// Buat kanvas untuk gambar
const canvas = createCanvas(videoWidth, videoHeight);
const ctx = canvas.getContext('2d');

// Atur properti kanvas
ctx.fillStyle = 'white';
ctx.font = '24px Arial';

// Gambar teks ke kanvas
ctx.fillText(`
LAPORAN PEKERJAAN DATA ENTRY

Tanggal: 27 Oktober 2023
Pengirim: Inno Insani
Tim: Inno - Ayu

Berdasarkan permintaan dari Pimpinan Divisi "Wibu" untuk sampel Data Calon Gubernur Potensial, berikut adalah rincian pekerjaan yang telah kami lakukan:

1. Jumlah total provinsi adalah 38.
2. Jumlah yang harus diambil sebanyak 37 provinsi.
3. Terdapat 1 provinsi yang dikecualikan, yaitu Yogyakarta, karena tidak ada pemilihan gubernur.
4. Hingga saat ini, kami telah mengumpulkan data dari 20 provinsi.
5. Sisanya masih dalam tahap progres.

Kami juga ingin menginformasikan bahwa link ke berkas yang terkait telah disertakan:
<kasi linknya disini >

Demikianlah laporan kemajuan ini kami sampaikan. Terima kasih.

`, 100, 100);

// Simpan kanvas sebagai gambar PNG
const imageBuffer = canvas.toBuffer('image/png');
fs.writeFileSync('canvas.png', imageBuffer);

// Buat video
ffmpeg()
    .input('canvas.png')
    .input("./lagu.mp3")
    .inputFPS(videoFPS)
    .inputOptions([`-t 120`])
    .videoCodec('libx264')
    .output('output.mp4')
    .on('end', () => {
        console.log('Video berhasil dibuat.');
    })
    .run();

