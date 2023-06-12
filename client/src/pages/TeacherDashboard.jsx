import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const TeacherDashboard = () => {
  const logout = (event) => {
    event.preventDefault();
    const loggedOut = Auth.logout();
    if (loggedOut) {
      alert("You are now logged out");
    } else {
      alert("Logout unsuccessful");
    }
  };
  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <h1>Teacher Dashboard</h1>
          <h2>Date...insert day.js functionality here</h2>
          <div>
            <h2>Actions</h2>
            <Link to="/teacher/:id/createAssignment">
              <button>Create Assignment</button>
            </Link>
            <button>Bookkeeping/Invoices</button>
            <Link to="/teacher/:id/studentDatabase">
              <button>View Student Database</button>
            </Link>
            <button>View Calendar</button>
            <Link to="/teacher/:id/createSkillSheet">
              <button>Create Skill Sheet</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </div>
          <div>
            <h2>Studio Info</h2>
            {/* Insert studio info component here */}
          </div>
          <div>
            <h2>Today's Schedule</h2>
            {/* Insert today's schedule component here */}
          </div>
        </div>
      ) : (
        <div>
          <h2>Please Log In</h2>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
