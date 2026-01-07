const audio = document.getElementById("audioPlayer");
const video = document.getElementById("videoPlayer");

const audioTime = document.getElementById("audioTime");
const videoTime = document.getElementById("videoTime");

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("timeupdate", () => {
    audioTime.textContent = formatTime(audio.currentTime);
});

video.addEventListener("timeupdate", () => {
    videoTime.textContent = formatTime(video.currentTime);
});