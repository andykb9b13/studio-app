import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import CreatePracticePlan from "../components/CreatePracticePlan";

const StudentDetails = () => {
  const { id } = useParams();
  console.log("this is the id from params", id);

  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  const [clicked, setClicked] = useState(false);
  const [planClicked, setPlanClicked] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setClicked(!clicked);
  };

  const handlePlanClick = (event) => {
    event.preventDefault();
    setPlanClicked(!planClicked);
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
      <Link to="/teacher/studentDatabase/editStudent">
        <button>Edit Student</button>
      </Link>
      <button onClick={handleClick}>
        {!clicked ? "View Practice Plans" : "Close"}
      </button>
      <button onClick={handlePlanClick}>
        {!planClicked ? "Create Practice Plan" : "Close"}
      </button>

      {clicked ? (
        <div>
          {practicePlans &&
            practicePlans.map((practicePlan, i) => (
              <div key={i}>
                <h2>{practicePlan.name}</h2>
                {practicePlan.assignments &&
                  practicePlan.assignments.map((assignment, i) => (
                    <div key={i}>
                      <h3>Exercise Name: {assignment.exerciseName}</h3>
                      <p>Date: {assignment.date}</p>
                      <p>Assignment Type: {assignment.assignmentType}</p>
                      <p>Source: {assignment.source}</p>
                      <p>Pages: {assignment.pages}</p>
                      <p>Metronome: {assignment.metronome}</p>
                      <p>Special Notes: {assignment.specialNotes}</p>
                    </div>
                  ))}
                <p>{practicePlan.assignments[0].exerciseName}</p>
              </div>
            ))}
        </div>
      ) : (
        <h2>Practice Plans Here</h2>
      )}

      {planClicked ? <CreatePracticePlan /> : ""}
    </div>
  );
};

export default StudentDetails;
