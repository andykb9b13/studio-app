import React, { useState } from "react";
import { Link } from "react-router-dom";

function Counter({ title, count, setCount }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Delete
      </button>
    </div>
  );
}

function SuccessRate({ percentage }) {
  return (
    <div>
      <h2>Success Rate</h2>
      <p>{percentage} % success rate</p>
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
          <button onClick={() => setActive(false)}>Set Tries</button>
        </div>
      )}
      <p>{numTries}</p>
    </div>
  );
}

const StreakPractice = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);

  const percentage =
    Math.floor((successCount / (successCount + blunderCount)) * 100) || 0;

  return (
    <div>
      <h1>Streak Practice</h1>
      <button>Save Streak</button>

      <Counter
        title={"Blunders"}
        count={blunderCount}
        setCount={setBlunderCount}
        key={1}
      />
      <Counter
        title={"Successes"}
        count={successCount}
        setCount={setSuccessCount}
        key={2}
      />
      <SuccessRate percentage={percentage} />
      <Tries numTries={numTries} setNumTries={setNumTries} />
    </div>
  );
};

export default StreakPractice;
