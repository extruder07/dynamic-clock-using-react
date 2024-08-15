import React, { useState, useRef, useEffect } from 'react';
import alarmSoundPath from '../assets/alarm.m4a'; // Update the path as necessary

function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmActive, setAlarmActive] = useState(false);

  const alarmSound = useRef(new Audio(alarmSoundPath));
  const alarmTimeout = useRef(null);

  useEffect(() => {
    if (alarmActive) {
      alarmSound.current.loop = true;
      alarmSound.current.play();
    } else {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
  }, [alarmActive]);

  const handleSetAlarm = () => {
    const alarmDate = new Date();
    const [hours, minutes] = alarmTime.split(':').map(Number);
    alarmDate.setHours(hours, minutes, 0, 0);
    const timeToAlarm = alarmDate.getTime() - Date.now();
    if (timeToAlarm > 0) {
      alarmTimeout.current = setTimeout(() => {
        setAlarmActive(true);
        alert('Alarm is ringing!');
      }, timeToAlarm);
      alert('Alarm is set!');
    } else {
      alert('Please select a future time for the alarm.');
    }
  };

  const handleCancelAlarm = () => {
    clearTimeout(alarmTimeout.current);
    setAlarmActive(false);
    if (window.confirm('Do you want to stop the alarm?')) {
      alert('Alarm is canceled.');
    }
  };

  return (
    <div className="alarm">
      <h1>Alarm</h1>
      <label htmlFor="alarm-input">Please Select the Time</label>
      <input
        type="time"
        id="alarm-input"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <button onClick={handleCancelAlarm}>Cancel Alarm</button>
      <button onClick={handleSetAlarm}>Set Alarm</button>
    </div>
  );
}

export default Alarm;
