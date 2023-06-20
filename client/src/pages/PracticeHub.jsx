import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PracticeHub = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Practice Hub</h1>
      <div>
        <Link to={`/student/${id}/timedPractice`}>
          <button>Timed Practice</button>
        </Link>
        <Link to={`/student/${id}/streakPractice`}>
          <button>Streak Practice</button>
        </Link>
        <Link to={`/student/${id}/skillSheetView`}>
          <button>Skill Sheets</button>
        </Link>
        <Link to="/teacher/:id/createAssignment">
          <button>Create Assignment</button>
        </Link>
        <button>Track Your Progress</button>
        <button>Resources</button>
        <Link to="/student/:id/assignmentView">
          <button>View Assignments</button>
        </Link>
        <Link to="/tutor">
          <button>Virtual Tutor</button>
        </Link>
      </div>
      {/* Need to make a conditional statement here so if it's the teacher coming here
      then you go back to the teacher dashboard but if it's the student, 
      you go back to the student dashboard */}
      <Link>
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default PracticeHub;
