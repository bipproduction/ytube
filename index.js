const record_video = require("./src/record_video");
const args = process.argv.splice(2)
const _ = require('lodash');
const shopee_login = require("./src/shopee_login");
require('colors')

// const upload_video = require("./src/upload_video");
// const video_show = require("./src/video_show");
// const video_slide = require("./src/video_slide");

// video_slide()
// upload_video()
// video_show()
// record_video()

const list_menu = [
    {
        id: "shopee_login",
        name: "shopee login",
        des: "shopee login",
        arg: "--shopee-login",
        a: "-sl",
        act: shopee_login
    },
    {
        id: "record_video",
        name: "record video",
        des: "record video",
        arg: "--record-video",
        a: "-rv",
        act: record_video
    }
]

const info = `
MENU
----------
${list_menu.map((v) => v.a + "\t" + v.arg + "\t" + v.des).join('\n')}

EXAMPLE
cmd ${list_menu[0].a}
`.cyan


async function main() {
    if (_.isEmpty(args)) return console.log(info)
    const cmd = list_menu.find((v) => v.arg === args[0] || v.a === args[0])
    if (!cmd) return console.log(info)
    await cmd.act()
}

main()