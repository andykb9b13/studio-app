import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PracticeHub = () => {
  const { id } = useParams();

  const buttonInfo = [
    { label: "Timed Practice", link: `/student${id}/timedPractice` },
    { label: "Streak Practice", link: `/student/${id}/streakPractice` },
    { label: "Skill Sheets", link: `/student/${id}/skillSheetView` },
    { label: "Create Assignment", link: `/teacher/${id}/createAssignment` },
    { label: "Track Your Progress", link: "" },
    { label: "Resources", link: "" },
    { label: "View Assignments", link: `/student/:id/assignmentView` },
    { label: "Tutor", link: `/tutor` },
    { label: "Back to Student Details", link: `/teacher/studentDetails/${id}` },
  ];

  return (
    <div>
      <h1>Practice Hub</h1>
      {buttonInfo.map((button, i) => (
        <Link to={button.link} key={i}>
          <button>{button.label}</button>
        </Link>
      ))}
    </div>
  );
};

export default PracticeHub;
