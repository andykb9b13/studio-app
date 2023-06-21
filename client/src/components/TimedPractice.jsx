import React from "react";
import { Link } from "react-router-dom";

const TimedPractice = ({ student }) => {
  return (
    <div>
      <h1>Timed Practice</h1>
      <h2>
        Hi there {student.firstName} {student.lastName}!
      </h2>
      <p>Are you ready to practice your {student.instrument}?</p>
      <p>Your lesson is on {student.lessonDay}</p>
      <button>Start</button>
      <button>Stop</button>
      <h2>Set Time</h2>
      <input type="number" placeholder="minutes" />
      {/* insert timer here */}
      <Link to={`/student/${student._id}/practiceHub`}>
        <button>Back to Practice Hub</button>
      </Link>
    </div>
  );
};

export default TimedPractice;
