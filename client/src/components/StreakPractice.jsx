import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Counter({ title, count, setCount, numTries }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        disabled={numTries === 0}
      >
        Add
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
        disabled={numTries === 0}
      >
        Delete
      </button>
    </div>
  );
}

function SuccessRate({ percentage }) {
  let message = "Let's do this!";
  if (percentage <= 25) {
    message = "Don't give up!";
  } else if (percentage <= 50) {
    message = "Not bad! Keep working on it.";
  } else if (percentage <= 75) {
    message = "You're doing great. Go for 100%";
  } else if (percentage < 100) {
    message = "You're sooooo close!";
  } else if (percentage === 100) {
    message = "Awesome! You got it!";
  }

  return (
    <div>
      <h2>Success Rate</h2>
      <p>{percentage} % success rate</p>
      <p>{message}</p>
    </div>
  );
}

function Tries({ numTries, setNumTries, triesLeft }) {
  const [active, setActive] = useState(false);
  let tries = 0;

  return (
    <div>
      <h2>Number of Tries</h2>
      {!active ? (
        <div>
          <label htmlFor="numInput">Set the number of tries</label>
          <input
            type="number"
            name="numInput"
            onChange={(e) => {
              tries = e.target.value;
            }}
          />
          <button
            onClick={() => {
              setActive(true);
              setNumTries(tries);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setActive(false)}>Reset Tries</button>
          <p>Tries Left: {triesLeft}</p>
        </div>
      )}
    </div>
  );
}

const StreakPractice = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const triesLeft = numTries - successCount - blunderCount;
  const totalTried = successCount + blunderCount;
  const percentage = Math.floor((successCount / totalTried) * 100) || 0;

  function resetStreak() {
    setSuccessCount(0);
    setBlunderCount(0);
    setNumTries(0);
  }

  return (
    <div>
      <h1>Streak Practice</h1>
      <button onClick={resetStreak}>Reset Streak</button>
      <div>
        <Tries
          numTries={numTries}
          setNumTries={setNumTries}
          triesLeft={triesLeft}
        />
        <Counter
          title={"Blunders"}
          count={blunderCount}
          setCount={setBlunderCount}
          numTries={numTries}
        />
        <Counter
          title={"Successes"}
          count={successCount}
          setCount={setSuccessCount}
          numTries={numTries}
        />
      </div>

      <div>
        <SuccessRate percentage={percentage} />
      </div>
    </div>
  );
};

export default StreakPractice;
