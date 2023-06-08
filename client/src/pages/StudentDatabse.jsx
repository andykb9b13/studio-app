import React from "react";
import { Link } from "react-router-dom";

const StudentDatabase = () => {
  return (
    <div>
      <h1>Student Database</h1>
      <div>{/* insert database component here */}</div>
      <Link to="/teacher/:id">
        <button>Back</button>
      </Link>
      <Link to="teacher/:id/addStudent">
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default StudentDatabase;
