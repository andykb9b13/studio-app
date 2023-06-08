import React from "react";
import { Link } from "react-router-dom";

const StudentDetails = () => {
  return (
    <div>
      <h1>Student Details</h1>
      <div>{/* insert student details component here */}</div>
      <Link to="/teacher/:id/studentDatabase">
        <button>Back</button>
      </Link>
      {/* Need to create Edit student page and add it to App.js */}
      <Link to="/teacher/:id/studentDatabase/editStudent">
        <button>Edit Student</button>
      </Link>
      <Link to="/student/:id/assignmentView">
        <button>View Assignments</button>
      </Link>
    </div>
  );
};

export default StudentDetails;
