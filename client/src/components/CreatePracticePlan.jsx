import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../utils/mutations";

const CreatePracticePlan = ({ studentId }) => {
  const [formData, setFormData] = useState({
    date: "",
    exerciseName: "",
    source: "",
    assignmentType: "",
    specialNotes: "",
    metronome: "",
    pages: "",
  });

  const [formErrors, setFormErrors] = useState({
    date: "",
    exerciseName: "",
    source: "",
    assignmentType: "",
    specialNotes: "",
    metronome: "",
    pages: "",
  });

  const [createPracticePlan, { errors }] = useMutation(ADD_PRACTICEPLAN);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.date.trim()) {
      errors.date = "Please Enter a date";
      isValid = false;
    }

    if (!formData.source.trim()) {
      errors.exerciseName = "Please enter the exerciseName";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    if (validateForm) {
      event.preventDefault();
      try {
        const { data } = await createPracticePlan({
          variables: { studentId: studentId, ...formData },
        });
        alert("Practice Plan Created");
      } catch (err) {
        console.error(err);
        alert("Could not create Practice Plan");
      }
    }
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setClicked(!clicked);
  };

  const clearForm = () => {
    setFormData({
      date: "",
      exerciseName: "",
      source: "",
      assignmentType: "",
      specialNotes: "",
      metronome: "",
      pages: "",
    });
  };

  return (
    <div>
      <h1>Create a Practice Plan</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} id="name" />
        <button>Create Practice Plan</button>
      </form>
    </div>
  );
};

export default CreatePracticePlan;
