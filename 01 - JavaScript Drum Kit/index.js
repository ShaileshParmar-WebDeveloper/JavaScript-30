const keys = document.querySelectorAll(".key");

const playsound = (e) => {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
};

function onClickSound() {
  const audioKey = this.attributes[0].nodeValue;
  const audio = document.querySelector(`audio[data-key="${audioKey}"]`);
  this.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("click", onClickSound);
});

window.addEventListener("keydown", playsound);
