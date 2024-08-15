import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return (
    <div className="container">
      <h1 className="heading">Dynamic Wall Clock</h1>
      <div className="circle">
        <div className="number" style={{ '--i': 1 }}>4</div>
        <div className="number" style={{ '--i': 2 }}>5</div>
        <div className="number" style={{ '--i': 3 }}>6</div>
        <div className="number" style={{ '--i': 4 }}>7</div>
        <div className="number" style={{ '--i': 5 }}>8</div>
        <div className="number" style={{ '--i': 6 }}>9</div>
        <div className="number" style={{ '--i': 7 }}>10</div>
        <div className="number" style={{ '--i': 8 }}>11</div>
        <div className="number" style={{ '--i': 9 }}>12</div>
        <div className="number" style={{ '--i': 10 }}>1</div>
        <div className="number" style={{ '--i': 11 }}>2</div>
        <div className="number" style={{ '--i': 12 }}>3</div>
        <div className="point"></div>
        <div id="hour-hand" style={{ transform: `rotate(${(hours % 12) * 30 + (minutes / 60) * 30}deg)` }}></div>
        <div id="minute-hand" style={{ transform: `rotate(${minutes * 6}deg)` }}></div>
        <div id="second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }}></div>
      </div>
      <h1 className="heading">Dynamic Digital Clock</h1>
      <div className="rectangle">
        <div id="hour">{String(displayHours).padStart(2, '0')}</div>
        <div id="minute">{String(minutes).padStart(2, '0')}</div>
        <div id="second">{String(seconds).padStart(2, '0')}</div>
        <div id="ampm">{ampm}</div>
      </div>
    </div>
  );
}

export default Clock;
