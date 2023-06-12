import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import { useStudentContext } from "../utils/StudentContext";

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

  const { students, updateStudents } = useStudentContext();

  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  const teacher = data?.teacher || [];
  console.log("This is teacher", teacher.students);

  updateStudents(teacher.students);

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <h1>
            {teacher.firstName} {teacher.lastName}'s Dashboard
          </h1>
          <h2>Date...insert day.js functionality here</h2>
          <div>
            <h2>Actions</h2>

            <Link to="/teacher/createAssignment">
              <button>Create Assignment</button>
            </Link>

            <button>Bookkeeping/Invoices</button>

            <Link to="/teacher/studentDatabase">
              <button>View Student Database</button>
            </Link>

            <button>View Calendar</button>

            <Link to="/teacher/createSkillSheet">
              <button>Create Skill Sheet</button>
            </Link>

            <button onClick={logout}>Logout</button>
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
