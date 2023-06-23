import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import CreatePracticePlan from "../components/CreatePracticePlan";
import PracticePlan from "../components/PracticePlan";
import EditStudent from "../components/EditStudent";
// import { useStudentContext } from "../utils/StudentContext";

const StudentDetails = () => {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <div>
      <h1>Student Details</h1>
      <div>
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
        <p>Teacher ID: {student.teacherId}</p>
      </div>
      {/* Need to create Edit student page and add it to App.js */}
      <button onClick={() => handleClick(0)}>Close</button>
      <button onClick={() => handleClick(1)}>Edit Student</button>
      <button onClick={() => handleClick(2)}>View Practice Plans</button>
      <button onClick={() => handleClick(3)}>Create Practice Plan</button>

      <Link to={`/student/${id}/practiceHub`}>
        <button>To Practice Hub</button>
      </Link>

      {active === 1 ? <EditStudent studentId={id} /> : ""}
      {active === 2 ? (
        <div>
          {practicePlans &&
            practicePlans.map((practicePlan, i) => (
              <PracticePlan
                practicePlan={practicePlan}
                studentId={id}
                key={i}
              />
            ))}
        </div>
      ) : (
        ""
      )}
      {active === 3 ? <CreatePracticePlan studentId={id} /> : ""}
    </div>
  );
};

export default StudentDetails;
