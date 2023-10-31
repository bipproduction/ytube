const { upload } = require('youtube-videos-uploader');
const path = require('path')

module.exports = async function (title="title") {
    upload({
        email: "malikkurosakisatu@gmail.com",
        pass: "makuro123"
    },
        [
            {
                path: path.join(__dirname, "./../../output/video/output.mp4"),
                title: title,
                description: title,
                publishType: "PUBLIC",
                isAgeRestriction: false,
                isChannelMonetized: false,
                isNotForKid: true,
                tags: ['malik_kurosaki', 'shopee', 'makuro'],
                language: 'english',
                skipProcessingWait: true,
                // thumbnail: path.join(__dirname, './../../output/img/canvas.png'),
                onProgress: (progress) => { console.log('progress', progress) },
                onSuccess: (val) => {
                    console.log("success", val)
                },
                uploadAsDraft: false,

            }
        ],
        {
            headless: false,
        }
    ).then((v) => {
        console.log(v)
    })
}