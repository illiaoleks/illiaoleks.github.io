document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let startTime = parseInt(localStorage.getItem('timerStartTime') || '0');
    let accumulatedTime = parseInt(localStorage.getItem('accumulatedTime') || '0'); 
    let isRunning = localStorage.getItem('timerRunning') === 'true';
    
    const timerDisplay = document.querySelector('.timer-display');
    const startBtn = document.getElementById('startTimer');
    const stopBtn = document.getElementById('stopTimer');
    const resetBtn = document.getElementById('resetTimer');
    const todayTimeSpan = document.getElementById('todayTime');
    const weekTimeSpan = document.getElementById('weekTime');
    
    function updateTimerDisplay() {
        let currentSeconds;
        if (isRunning) {
            currentSeconds = accumulatedTime + Math.floor((Date.now() - startTime) / 1000);
        } else {
            currentSeconds = accumulatedTime;
        }
        
        const hours = Math.floor(currentSeconds / 3600);
        const minutes = Math.floor((currentSeconds % 3600) / 60);
        const secs = currentSeconds % 60;
        
        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        const todayMins = Math.floor(currentSeconds / 60);
        todayTimeSpan.textContent = `${todayMins} хв`;
    }
    
    function startTimer() {
        if (!isRunning) {
            startTime = Date.now();
            isRunning = true;
            localStorage.setItem('timerStartTime', startTime.toString());
            localStorage.setItem('timerRunning', 'true');
            
            timer = setInterval(updateTimerDisplay, 1000);
            updateTimerDisplay();
            
            startBtn.disabled = true;
            stopBtn.disabled = false;
        }
    }
    
    function stopTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
            accumulatedTime += elapsedSeconds;
            
            localStorage.setItem('accumulatedTime', accumulatedTime.toString());
            localStorage.setItem('timerRunning', 'false');
            
            console.log(`Сесія навчання: ${timerDisplay.textContent}`);
            updateTimerDisplay();
            
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    }
    
    function resetTimer() {
        if (isRunning) {
            stopTimer();
        }
        
        accumulatedTime = 0;
        startTime = 0;
        
        localStorage.removeItem('timerStartTime');
        localStorage.setItem('accumulatedTime', '0'); 
        localStorage.setItem('timerRunning', 'false');
        
        updateTimerDisplay();
        todayTimeSpan.textContent = '0 хв';
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
    
    function loadTimeData() {
        const weekHours = 3.5;
        weekTimeSpan.textContent = `${weekHours} год`;
    }
    
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    if (isRunning) {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        
        if (elapsedSeconds > 86400) { 
            stopTimer();
        } else {
            accumulatedTime += elapsedSeconds;
            startTime = currentTime;
            timer = setInterval(updateTimerDisplay, 1000);
            
            startBtn.disabled = true;
            stopBtn.disabled = false;
        }
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
    
    updateTimerDisplay();
    loadTimeData();
});