import React from "react";
import { Link } from "react-router-dom";

const AssignmentView = () => {
  return (
    <div>
      <h1>Assignment View</h1>
      {/* insert assignment component here */}
      <button>View Streaks</button>
      <Link to="/student/:id/streakPractice">
        <button>Start a Streak</button>
      </Link>
      <Link to="/student/:id/weeklyPlan">
        <button>Back to Weekly Plan</button>
      </Link>
      <Link to="/student/:id">
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default AssignmentView;
