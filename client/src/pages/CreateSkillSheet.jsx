import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ADD_SKILLSHEET } from "../utils/mutations";

const CreateSkillSheet = () => {
  const teacherId = useParams();

  const [formData, setFormData] = useState({
    sheetName: "",
    scales: "",
    arpeggios: "",
    articulation: "",
    slurs: "",
    longTones: "",
    exercises: "",
    etudes: "",
    pieces: "",
  });

  const [formErrors, setFormErrors] = useState({
    sheetName: "",
    scales: "",
    arpeggios: "",
    articulation: "",
    slurs: "",
    longTones: "",
    exercises: "",
    etudes: "",
    pieces: "",
  });

  const [createSkillSheet, { errors }] = useMutation(ADD_SKILLSHEET);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.sheetName.trim()) {
      errors.sheetName = "Please Enter a Name for the Sheet";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        const { data } = await createSkillSheet({
          variables: { teacherId, ...formData },
        });
        console.log(data);
        alert("Skill sheet successfully created!");
      }
    } catch (err) {
      alert("Could not create skill sheet");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Skill Sheet</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sheetName">Sheet Name</label>
        <input
          type="text"
          name="sheetName"
          id="sheetName"
          onChange={handleChange}
        />
        <label htmlFor="scales">Scales</label>
        <input type="text" name="scales" id="scales" onChange={handleChange} />
        <label htmlFor="arpeggios">Arpeggios</label>
        <input
          type="text"
          name="arpeggios"
          id="arpeggios"
          onChange={handleChange}
        />
        <label htmlFor="articulation">Articulation</label>
        <input
          type="text"
          name="articulation"
          id="articulation"
          onChange={handleChange}
        />
        <label htmlFor="slurs">Slurs</label>
        <input type="text" name="slurs" id="slurs" onChange={handleChange} />
        <label htmlFor="longTones">Long Tones</label>
        <input
          type="text"
          name="longTones"
          id="longTones"
          onChange={handleChange}
        />
        <label htmlFor="exercises">Exercises</label>
        <input
          type="text"
          name="exercises"
          id="exercises"
          onChange={handleChange}
        />
        <label htmlFor="etudes">Etudes</label>
        <input type="text" name="etudes" id="etudes" onChange={handleChange} />
        <label htmlFor="pieces">Pieces</label>
        <input type="text" name="pieces" id="pieces" onChange={handleChange} />
        <button type="submit">Create Skill Sheet</button>
      </form>
      <Link to={`/teacher/${teacherId}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default CreateSkillSheet;
