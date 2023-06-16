import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { useStudentContext } from "../utils/StudentContext";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import CreateStudent from "../components/CreateStudent";

const StudentDatabase = () => {
  // getting the students using StudentContext.jsx
  // const { students } = useStudentContext();
  // console.log("This is students", students);

  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  const [clicked, setClicked] = useState(false);
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  const teacher = data?.teacher || [];
  const students = data?.teacher.students || [];
  const teacherId = data?.teacher || [];

  return (
    <div>
      <h1>Student Database</h1>
      <div>
        <h2>Studio Info</h2>
        <button onClick={handleClick}>Add Student</button>
        {clicked ? <CreateStudent teacherId={id} /> : ""}

        {students &&
          students.map((student, i) => (
            <div key={i}>
              <h2>
                {student.firstName} {student.lastName}
              </h2>
              <Link to={`/teacher/studentDetails/${student._id}`}>
                <button>View Student Info</button>
              </Link>
              <Link to={`/student/${student._id}/weeklyPlan`}>
                <button>View Weekly Plans</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentDatabase;
