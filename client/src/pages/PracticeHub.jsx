import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { StudentProvider, useStudentContext } from "../utils/StudentContext";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";

import TimedPractice from "../components/TimedPractice";
import StreakPractice from "../components/StreakPractice";
import SkillSheetView from "../components/SkillSheetView";
import CreateAssignment from "../components/CreateAssignment";
import VirtualTutor from "./virtualTutor/VirtualTutor";
import PracticePlan from "../components/PracticePlan";

const PracticeHub = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("home");

  const { loading, error, data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const [student, setStudent] = useState(null);

  console.log(data);

  useEffect(() => {
    if (data) {
      setStudent(data.student);
    }
    if (loading) {
      console.log("loading!!!");
    }
    if (error) {
      console.log("Error", error);
    }
  }, [data, error, loading]);

  const home = status === "home";
  const timedPractice = status === "timedPractice";
  const streakPractice = status === "streakPractice";
  const skillSheets = status === "skillSheets";
  const createAssignment = status === "createAssignment";
  const progress = status === "progress";
  const resources = status === "resources";
  const practicePlan = status === "practicePlan";
  const tutor = status === "tutor";

  const buttonInfo = [
    {
      label: "Timed Practice",
      description: "Set a timer for yourself",
      id: "timedPractice",
    },
    {
      label: "Streak Practice",
      description: "Get on a winning streak!",
      id: "streakPractice",
    },
    {
      label: "Skill Sheets",
      description: "View your skill sheets",
      id: "skillSheets",
    },
    {
      label: "Create Assignment",
      description: "Make an assignment",
      id: "createAssignment",
    },
    {
      label: "Track Your Progress",
      description: "See how far you've come!",
      id: "progress",
    },
    {
      label: "Resources",
      description: "Check out some external resources",
      id: "resources",
    },
    {
      label: "View Practice Plans",
      description: "View all past and present assignments",
      id: "practicePlan",
    },
    {
      label: "Tutor",
      description:
        "Having trouble and not sure where to start? Try the virtual tutor.",
      id: "tutor",
    },
  ];

  const handleClick = (name) => {
    console.log(name);
    setStatus(name);
  };

  return (
    <div>
      <h1>Practice Hub</h1>
      <Link to={`/teacher/studentDetails/${id}`}>
        <button> Back to Student Details</button>
      </Link>
      {buttonInfo.map((button, i) => (
        <button
          key={i}
          onClick={() => {
            handleClick(button.id);
          }}
        >
          {button.label}
        </button>
      ))}
      {/* I need to wrap all of this in the Student Provider so it can have access to the id */}

      {/* Here I've just hardcoded the student id to be passed as a prop but 
        the problem is I will have to drill it down pretty far if necessary. 
        I need to use context.  */}
      {timedPractice && <TimedPractice student={student} />}
      {streakPractice && <StreakPractice student={student} />}
      {skillSheets && <SkillSheetView student={student} />}
      {createAssignment && <CreateAssignment student={student} />}
      {practicePlan && <PracticePlan student={student} />}
      {tutor && <VirtualTutor student={student} />}
    </div>
  );
};

export default PracticeHub;
