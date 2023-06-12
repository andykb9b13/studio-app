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
              <h2>
                {student.firstName} {student.lastName}
              </h2>
              <p>Email: {student.email}</p>
              <p>Primary Contact: {student.primaryContact}</p>
              <p>Primary Contact Email: {student.primaryContactEmail}</p>
              <p>Instrument: {student.instrument}</p>
              <p>Lesson Day: {student.lessonDay}</p>
              <p>Lesson Time: {student.lessonTime}</p>
              <p>Grade: {student.grade}</p>
              <p>School: {student.school}</p>
              <p>Lesson Location: {student.lessonLocation}</p>
              <p>Is Active: {student.isActive}</p>
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
