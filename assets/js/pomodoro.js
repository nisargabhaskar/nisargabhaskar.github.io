let timerInterval;
let totalSeconds = 30 * 60;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const alarmSound = document.getElementById("alarmSound");

function updateDisplay() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;

    minutesEl.textContent = mins.toString().padStart(2, "0");
    secondsEl.textContent = secs.toString().padStart(2, "0");
}

document.getElementById("start").onclick = function () {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            alarmSound.currentTime = 0;  // restart audio to beginning
            alarmSound.play();           // 🎸 rock-and-roll plays now!
        }
    }, 1000);
};

document.getElementById("pause").onclick = function () {
    clearInterval(timerInterval);
    timerInterval = null;
};

document.getElementById("reset").onclick = function () {
    clearInterval(timerInterval);
    timerInterval = null;

    // Stop audio
    alarmSound.pause();
    alarmSound.currentTime = 0;

    // Reset time
    totalSeconds = 30 * 60;
    updateDisplay();
};

// Initialize display
updateDisplay();
