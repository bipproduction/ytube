const { upload } = require('youtube-videos-uploader');
const path = require('path')

module.exports = async function upload_ytube (title="title", link) {
    upload({
        email: "malikkurosakisatu@gmail.com",
        pass: "makuro123"
        
    },
        [
            {
                path: path.join(__dirname, "./assets/video_combine.mp4"),
                title: title,
                description: `${title} \n${link}`,
                publishType: "PUBLIC",
                isAgeRestriction: false,
                isChannelMonetized: false,
                isNotForKid: true,
                tags: ['malik_kurosaki', 'shopee', 'makuro'],
                language: 'english',
                skipProcessingWait: true,
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