const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector("#fullScreen");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  // OR
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scurbTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scurbTime;
}

function OpenfullScreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) {
    /* Firefox */
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE/Edge */
    player.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((rang) => rang.addEventListener("change", handleRangeUpdate));
ranges.forEach((rang) => rang.addEventListener("mousemove", handleRangeUpdate));

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
let fullScreenActive = false;
fullScreen.addEventListener("click", () => {
  if (!fullScreenActive) {
    fullScreenActive = !fullScreenActive;
    OpenfullScreen();
  } else {
    fullScreenActive = !fullScreenActive;
    closeFullscreen();
  }
});
