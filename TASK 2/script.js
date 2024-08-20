// script.js
let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.querySelector('.time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.querySelector('.laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
    timeDisplay.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    startStopBtn.innerHTML = "Pause";
}

function pause() {
    clearInterval(timerInterval);
    startStopBtn.innerHTML = "Start";
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00:00");
    elapsedTime = 0;
    startStopBtn.innerHTML = "Start";
    lapsContainer.innerHTML = "";
}

function lap() {
    let lapTime = timeToString(elapsedTime);
    let lapItem = document.createElement('div');
    lapItem.innerText = lapTime;
    lapsContainer.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.innerHTML === "Start") {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
