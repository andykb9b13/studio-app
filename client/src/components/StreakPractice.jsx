import React from "react";
import { Link } from "react-router-dom";

const StreakPractice = () => {
  return (
    <div>
      <h1>Streak Practice</h1>
      <label htmlFor="numTries"></label>
      <input type="number" name="numTries" placeholder="number of tries" />
      <label htmlFor="streakType">In-a-row or percentage?</label>
      <select name="streakType">
        <option value="in-a-row">In-a-row</option>
        <option value="percentage">Percentage</option>
      </select>
      <button>Start</button>
      <button>Cancel</button>
      <div>
        <h3>Blunders</h3>
        {/* Insert blunders component here */}
      </div>
      <div>
        <h3>Successes!</h3>
        {/* Insert success component here */}
      </div>
    </div>
  );
};

export default StreakPractice;
