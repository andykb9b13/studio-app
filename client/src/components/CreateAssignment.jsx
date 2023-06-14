import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_ASSIGNMENT } from "../utils/mutations";

const CreateAssignment = ({ studentId }) => {
  console.log("studentId", studentId);

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

  const [createAssignment, { errors }] = useMutation(ADD_ASSIGNMENT);

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
    console.log("This is studentId", studentId);
    if (validateForm) {
      event.preventDefault();
      try {
        const { data } = await createAssignment({
          variables: { studentId: studentId, ...formData },
        });
        console.log("This is formData", { ...formData });

        console.log("This is data", data);
        alert("Assignment Created");
      } catch (err) {
        console.error(err);
        alert("Could not create assignment");
      }
    }
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
      <h1>Create Assignment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="text" name="date" id="date" onChange={handleChange} />
        <label htmlFor="exerciseName">Exercise Name</label>
        <input
          type="text"
          name="exerciseName"
          id="exerciseName"
          onChange={handleChange}
        />
        <label htmlFor="source">Source</label>
        <input type="text" name="source" id="source" onChange={handleChange} />
        <label htmlFor="assignmentType">Assignment Type</label>
        <input
          type="text"
          name="assignmentType"
          id="assignmentType"
          onChange={handleChange}
        />
        <label htmlFor="specialNotes">Special Notes</label>
        <input
          type="textarea"
          name="specialNotes"
          id="specialNotes"
          onChange={handleChange}
        />
        <label htmlFor="metronome">Metronome</label>
        <input
          type="text"
          name="metronome"
          id="metronome"
          onChange={handleChange}
        />
        <label htmlFor="pages">Pages</label>
        <input type="text" name="pages" id="pages" onChange={handleChange} />
        <button>Create Assignment</button>
      </form>
      <Link to="/teacher/:id">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default CreateAssignment;
