import React from "react";
import { Link } from "react-router-dom";

const WeeklyPlan = () => {
  return (
    <div>
      <h1>Weekly Plan</h1>
      <div>
        {/* add so that the week display is dynamic */}
        <h2>Week Of ... </h2>
        {/* Insert assignmentcomponent here */}
        <Link to="/student/:id">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default WeeklyPlan;
