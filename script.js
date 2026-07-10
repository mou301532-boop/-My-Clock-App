// --- Theme Toggle Logic ---
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        btn.innerText = '🌙 Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.innerText = '☀️ Light Mode';
    }
}

// --- Tab Switching Logic ---
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// --- Real-Time Clock Logic ---
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// --- Formatter Helper ---
function formatTime(time, showMs = false) {
    let h = Math.floor(time / 3600000);
    let m = Math.floor((time % 3600000) / 60000);
    let s = Math.floor((time % 60000) / 1000);
    let formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    
    if (showMs) {
        let ms = Math.floor((time % 1000) / 10);
        formatted += `.${String(ms).padStart(2, '0')}`;
    }
    return formatted;
}

// --- Stopwatch Logic ---
let swInterval, swTime = 0, isSwRunning = false, swStart;

function startStopwatch() {
    if (isSwRunning) return;
    isSwRunning = true;
    swStart = Date.now() - swTime;
    swInterval = setInterval(() => {
        swTime = Date.now() - swStart;
        document.getElementById('stopwatch-display').innerText = formatTime(swTime, true);
    }, 10);
}

function pauseStopwatch() {
    clearInterval(swInterval);
    isSwRunning = false;
}

function resetStopwatch() {
    pauseStopwatch();
    swTime = 0;
    document.getElementById('stopwatch-display').innerText = "00:00:00.00";
}

// --- Timer Logic ---
let timerInterval, totalTimerMs = 0, isTimerRunning = false;

function startTimer() {
    if (isTimerRunning) return;

    if (totalTimerMs === 0) {
        let h = parseInt(document.getElementById('t-hours').value) || 0;
        let m = parseInt(document.getElementById('t-minutes').value) || 0;
        let s = parseInt(document.getElementById('t-seconds').value) || 0;
        totalTimerMs = (h * 3600000) + (m * 60000) + (s * 1000);
    }

    if (totalTimerMs <= 0) return;

    isTimerRunning = true;
    document.getElementById('timer-display').innerText = formatTime(totalTimerMs);

    let lastTick = Date.now();
    timerInterval = setInterval(() => {
        let now = Date.now();
        let delta = now - lastTick;
        lastTick = now;
        
        totalTimerMs -= delta;
        
        if (totalTimerMs <= 0) {
            totalTimerMs = 0;
            clearInterval(timerInterval);
            isTimerRunning = false;
            alert("⏰ Timer Finished!");
            resetTimer();
        }
        document.getElementById('timer-display').innerText = formatTime(totalTimerMs);
    }, 100);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    pauseTimer();
    totalTimerMs = 0;
    document.getElementById('timer-display').innerText = "00:00:00";
    document.getElementById('t-hours').value = "";
    document.getElementById('t-minutes').value = "";
    document.getElementById('t-seconds').value = "";
}