import React from "react";
import { Link } from "react-router-dom";

const SkillSheetView = () => {
  return (
    <div>
      <h1>Skill Sheet View</h1>
      {/* insert current sheet component here */}
      {/* insert completed sheets component here */}
      <Link to="/student/:id/practiceHub">
        <button>Back to Practice Hub</button>
      </Link>
    </div>
  );
};

export default SkillSheetView;
