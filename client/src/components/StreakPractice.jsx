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
  console.log(percentage);
  let message = "";
  switch (percentage) {
    case percentage <= 25:
      message = "Keep trying! Don't give up!";
      break;
    case percentage <= 50:
      message = "Not bad! Keep working on it.";
      break;
    case percentage <= 75:
      message = "Pretty good!";
      break;
    case percentage === 100:
      message = "You are crushing this!";
      break;
    default:
      message = "Let's do this!";
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
      <Tries numTries={numTries} setNumTries={setNumTries} />
      <Counter
        title={"Blunders"}
        count={blunderCount}
        setCount={setBlunderCount}
        numTries={numTries}
        key={1}
      />
      <Counter
        title={"Successes"}
        count={successCount}
        setCount={setSuccessCount}
        numTries={numTries}
        key={2}
      />
      <SuccessRate percentage={percentage} />
    </div>
  );
};

export default StreakPractice;
