const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const open_page = require('../../lib/open_page');
const { execFileSync, execSync } = require('child_process')
const path = require('path');
const upload_ytube = require('./upload_ytube');
require('colors')
const _ = require('lodash')

async function ambil_url(page) {
    await page.goto('https://shopee.co.id/');
    await new Promise(r => setTimeout(r, 5000))
    await scroll_page(page)

    // Menggunakan XPath untuk menemukan elemen anchor yang diinginkan
    const xpath = `//*[@id="main"]/div/div[2]/div/div/div[3]/div[2]/div[6]/div/div/div/div[2]/section/div/div[${_.random(1,10)}]/div/div/div/a[1]`;

    // Sekarang elemen terlihat
    const element = await page.$x(xpath);
    const href = await page.evaluate(link => link.href, element[0]);
    console.log('URL yang didapatkan:', href);
    return href
}

async function scroll_page(page) {
    const scrollHeight = await page.evaluate(() => {
        return document.body.scrollHeight;
    });
    const scrollStep = 50; // Jarak scroll pada setiap pergerakan
    const scrollDelay = 500; // Jeda antara setiap pergerakan

    let scrollY = 0;

    while (scrollY < scrollHeight) {
        await page.evaluate((scrollY, scrollStep) => {
            window.scrollBy(0, scrollStep);
        }, scrollY, scrollStep);

        await page.waitForTimeout(scrollDelay);

        scrollY += scrollStep;
    }
}

function get_title(url) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const text = lastPart.split("?")[0];
    return decodeURIComponent(text);
}


module.exports = async function () {

    const { browser, page } = await open_page()
    const recorder = new PuppeteerScreenRecorder(page);
    const alamat_url = await ambil_url(page)

    await page.goto(alamat_url);

    await new Promise(r => setTimeout(r, 5000))

    // 'simple.mp4'
    await recorder.start(path.join(__dirname, './assets/video.mp4')); // supports extension - mp4, avi, webm and mov

    await new Promise(r => setTimeout(r, 10000))

    await scroll_page(page)

    await recorder.stop();
    await browser.close();

    const convert = execSync(`
    ffmpeg -i ${path.join(__dirname, "./assets/video.mp4")} -i ${path.join(__dirname, "./assets/music.mp3")} -vcodec libx264 -c:a aac -strict experimental -y ${path.join(__dirname, "./assets/video_combine.mp4")}
    echo "success"
    `).toString()

    await upload_ytube(get_title(alamat_url), alamat_url)

    console.log("SUCCESS".green)
}

