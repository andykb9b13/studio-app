import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      {/* insert student profile component here */}
      <Link to="/student/:id/practiceHub">
        <button>Practice Hub</button>
      </Link>
      {/* insert weekly practice plan component here */}
      <Link to="/student/:id/weeklyPlan">
        <button>Weekly Plan</button>
      </Link>
      {/* insert skill sheet component here */}
      <Link to="/student/:id/skillSheetView">
        <button>Skill Sheet View</button>
      </Link>
      <button>Logout</button>
    </div>
  );
};

export default StudentDashboard;
