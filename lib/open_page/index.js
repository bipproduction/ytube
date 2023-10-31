const ppt = require('puppeteer')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs')
const path = require('path')

/**
 * 
 * @returns {Promise<{browser: puppeteer.Browser, page: puppeteer.Page}>}
 */
module.exports = async function (headless = false) {
    const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, './../../ppt_auth/cookies.json')))
    const browser = await puppeteer.launch({
        headless,
        defaultViewport: { width: 1440, height: 900, isMobile: true },
        args: [`--window-size=1440,900`, '--no-sandbox', '--disable-setuid-sandbox'],
    });

    /**
     * @type {ppt.Page[]}
     */
    const [page] = await browser.pages();
    page.setCookie(...cookie)
    return { browser, page }
}