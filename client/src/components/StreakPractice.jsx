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

function Tries({ numTries, setNumTries }) {
  const [active, setActive] = useState(false);

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
              setNumTries(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setActive(true);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setActive(false)}>Reset Tries</button>
          <p>{numTries}</p>
        </div>
      )}
    </div>
  );
}

const StreakPractice = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const [isActive, setIsActive] = useState(false);

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
      <button>Save Streak</button>
      <button onClick={resetStreak}>Reset Streak</button>
      {numTries <= totalTried ? (
        <div>
          <Tries numTries={numTries} setNumTries={setNumTries} />
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
          <SuccessRate percentage={percentage} />
        </div>
      ) : (
        <SuccessRate percentage={percentage} />
      )}
    </div>
  );
};

export default StreakPractice;
