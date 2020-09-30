const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hrsHand = document.querySelector(".hour-hand");

const changeTime = () => {
  const second = new Date().getSeconds();
  const clockSecond = (second / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${clockSecond}deg)`;

  const min = new Date().getMinutes();
  const clockmin = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${clockmin}deg)`;

  const hrs = new Date().getHours();
  const clockhrs = (hrs / 12) * 360 + 90;
  hrsHand.style.transform = `rotate(${clockhrs}deg)`;
};

setInterval(changeTime, 1000);
