ffmpeg -i simple.mp4 -i suara.mp3 -vcodec libx264 -c:a aac -strict experimental -y output-swipe.mp4
echo "success"