import React from 'react';
import Alarm from './Components/Alarm';
import Timer from './Components/Timer';
import Clock from './Components/Clock';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="upper">
        <Alarm />
        <Timer />
      </div>
      <Clock />
    </div>
  );
}

export default App;
