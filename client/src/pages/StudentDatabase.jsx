import React from "react";
import { Link, useParams } from "react-router-dom";
// import { useStudentContext } from "../utils/StudentContext";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";

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

  const teacher = data?.teacher || [];
  const students = data?.teacher.students || [];

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
              <Link to={`/teacher/studentDetails/${student._id}`}>
                <button>View Student Info</button>
              </Link>
            </div>
          ))}
      </div>
      <Link>
        <button>Add Student</button>
      </Link>
    </div>
  );
};

export default StudentDatabase;
