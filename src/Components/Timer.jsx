import React, { useState, useRef, useEffect } from 'react';
import timerSoundPath from '../assets/timer.m4a'; // Update the path as necessary

function Timer() {
  const [timerHours, setTimerHours] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerSeconds, setTimerSeconds] = useState('');
  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const [timerActive, setTimerActive] = useState(false);

  const timerSound = useRef(new Audio(timerSoundPath));
  const timerTimeout = useRef(null);
  const timerInterval = useRef(null);

  useEffect(() => {
    if (timerActive) {
      timerSound.current.loop = true;
      timerSound.current.play();
      timerInterval.current = setInterval(() => {
        const remainingTimeMs = timerTimeout.current - Date.now();
        if (remainingTimeMs <= 0) {
          setRemainingTime('00:00:00');
          setTimerActive(false);
          timerSound.current.pause();
          timerSound.current.currentTime = 0;
          clearInterval(timerInterval.current);
          alert('Timer is done!');
        } else {
          const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);
          setRemainingTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
      timerSound.current.pause();
      timerSound.current.currentTime = 0;
    }
  }, [timerActive]);

  const handleSetTimer = () => {
    const hours = parseInt(timerHours, 10) || 0;
    const minutes = parseInt(timerMinutes, 10) || 0;
    const seconds = parseInt(timerSeconds, 10) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      timerTimeout.current = Date.now() + totalSeconds * 1000;
      setTimerActive(true);
      alert('Timer is set!');
    } else {
      alert('Please select a valid time for the timer.');
    }
  };

  const handleCancelTimer = () => {
    setTimerActive(false);
    if (window.confirm('Do you want to stop the timer?')) {
      setRemainingTime('00:00:00');
      alert('Timer is canceled.');
    }
  };

  return (
    <div className="timer">
      <h1>Timer</h1>
      <label>Please Select the Time</label>
      <div className="timer-inputs">
        <input
          type="number"
          id="timer-hours"
          placeholder="HH"
          value={timerHours}
          onChange={(e) => setTimerHours(e.target.value)}
          min="0"
          max="23"
        />
        <span>:</span>
        <input
          type="number"
          id="timer-minutes"
          placeholder="MM"
          value={timerMinutes}
          onChange={(e) => setTimerMinutes(e.target.value)}
          min="0"
          max="59"
        />
        <span>:</span>
        <input
          type="number"
          id="timer-seconds"
          placeholder="SS"
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(e.target.value)}
          min="0"
          max="59"
        />
      </div>
      <div id="remaining-time">Remaining Time: {remainingTime}</div>
      <button onClick={handleCancelTimer}>Cancel Timer</button>
      <button onClick={handleSetTimer}>Set Timer</button>
    </div>
  );
}

export default Timer;
