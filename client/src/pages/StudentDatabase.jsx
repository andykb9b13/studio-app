import React from "react";
import { Link } from "react-router-dom";
import { useStudentContext } from "../utils/StudentContext";

const StudentDatabase = () => {
  const { students } = useStudentContext();
  console.log("This is students", students);
  return (
    <div>
      <h1>Student Database</h1>
      <div>
        <h2>Studio Info</h2>
        {students &&
          students.map((student, i) => (
            <div key={i}>
              <h2>Student Info</h2>
              <p>Student First Name: {student.firstName}</p>
              <p>Student Last Name: {student.lastName}</p>
            </div>
          ))}
      </div>
      <Link>
        <button>Back</button>
      </Link>
      <Link>
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default StudentDatabase;
