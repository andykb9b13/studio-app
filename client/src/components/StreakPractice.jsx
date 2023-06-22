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

const StreakPractice = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);

  const percentage = Math.floor(
    (successCount / (successCount + blunderCount)) * 100
  );

  return (
    <div>
      <h1>Streak Practice</h1>
      <button>Start</button>
      <button>Cancel</button>

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
      <h2>Percentage</h2>
      <p>{percentage} % success rate</p>
    </div>
  );
};

export default StreakPractice;
