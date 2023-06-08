import React from "react";
import { Link } from "react-router-dom";

const CreateAssignment = () => {
  return (
    <div>
      <h1>Create Assignment</h1>
      <form action="submit">
        <label htmlFor="date">Date</label>
        <input type="text" name="date" id="date" />
        <label htmlFor="exerciseName">Exercise Name</label>
        <input type="text" name="exerciseName" id="exerciseName" />
        <label htmlFor="source">Source</label>
        <input type="text" name="source" id="source" />
        <label htmlFor="assignmentType">Assignment Type</label>
        <input type="text" name="assignmentType" id="assignmentType" />
        <label htmlFor="specialNotes">Special Notes</label>
        <input type="textarea" name="specialNotes" id="specialNotes" />
        <label htmlFor="metronome">Metronome</label>
        <input type="text" name="metronome" id="metronome" />
        <label htmlFor="pages">Pages</label>
        <input type="text" name="pages" id="pages" />
        <button>Create Assignment</button>
      </form>
      <Link to="/teacher/:id">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default CreateAssignment;
