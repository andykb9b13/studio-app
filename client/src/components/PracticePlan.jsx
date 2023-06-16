import React, { useState } from "react";
import CreateAssignment from "./CreateAssignment";

const PracticePlan = ({ practicePlan, studentId }) => {
  console.log("practicePlan", practicePlan);

  const [clicked, setClicked] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setClicked(!clicked);
  };

  return (
    <div>
      <h2>{practicePlan.name}</h2>
      <button onClick={handleClick}>Create An Assignment for This Plan</button>
      {clicked ? (
        <CreateAssignment studentId={studentId} planId={practicePlan._id} />
      ) : (
        ""
      )}

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
    </div>
  );
};

export default PracticePlan;
