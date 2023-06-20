import React from "react";
import { Link } from "react-router-dom";

const TimedPractice = () => {
  return (
    <div>
      <h1>Timed Practice</h1>
      <button>Start</button>
      <button>Stop</button>
      <h2>Set Time</h2>
      <input type="number" placeholder="minutes" />
      {/* insert timer here */}
      <Link to="/student/:id/practiceHub">
        <button>Back to Practice Hub</button>
      </Link>
    </div>
  );
};

export default TimedPractice;
