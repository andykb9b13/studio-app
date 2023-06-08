import React from "react";
import { Link } from "react-router-dom";

const CreateSkillSheet = () => {
  return (
    <div>
      <h1>Create Skill Sheet</h1>
      <form action="submit">
        <label htmlFor="sheetNumber">Sheet Number</label>
        <input type="number" name="sheetNumber" id="sheetNumber" />
        <label htmlFor="sheetName">Sheet Name</label>
        <input type="text" name="sheetName" id="sheetName" />
        <label htmlFor="scales">Scales</label>
        <input type="text" name="scales" id="scales" />
        <label htmlFor="arpeggios">Arpeggios</label>
        <input type="text" name="arpeggios" id="arpeggios" />
        <label htmlFor="articulation">Articulation</label>
        <input type="text" name="articulation" id="articulation" />
        <label htmlFor="slurs">Slurs</label>
        <input type="text" name="slurs" id="slurs" />
        <label htmlFor="longTones">Long Tones</label>
        <input type="text" name="longTones" id="longTones" />
        <label htmlFor="exercises">Exercises</label>
        <input type="text" name="exercises" id="exercises" />
        <label htmlFor="etudes">Etudes</label>
        <input type="text" name="etudes" id="etudes" />
        <label htmlFor="pieces">Pieces</label>
        <input type="text" name="pieces" id="pieces" />
        <button type="submit">Create Skill Sheet</button>
      </form>
      <Link to="/teacher/:id">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default CreateSkillSheet;
