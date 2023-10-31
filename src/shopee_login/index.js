const open_page = require("../../lib/open_page")
const prompts = require('prompts')
const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
require('colors')
/**
 * 
 * @param {puppeteer.Browser} browser 
 * @param {puppeteer.Page} page 
 */
async function login(browser, page) {
    const cookie = await page.cookies()
    fs.writeFileSync(path.join(__dirname, './../../ppt_auth/cookies.json'), JSON.stringify(cookie))
    console.log("SUCCESS".green)
    process.exit()
}

const list_perintah = [
    {
        id: "save",
        act: login
    },

]

const info = `
OPTION
--------------------------------
${list_perintah.map((v) => v.id)}
`

async function perintah() {
    const { cmd } = await prompts({
        type: "text",
        name: "cmd",
        message: "masukkan perintah"
    })

    return cmd
}

module.exports = async function shopee_login() {
    const { browser, page } = await open_page()
    await page.goto('https://shopee.co.id/buyer/login')

    const cmd = await perintah()
    if (cmd === "save") {
        const cookie = await page.cookies()
        fs.writeFileSync(path.join(__dirname, './../../ppt_auth/cookies.json'), JSON.stringify(cookie, null, 2))
        browser.close()
    } else {
        browser.close()
    }

}