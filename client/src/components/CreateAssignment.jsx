import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ADD_ASSIGNMENT } from "../utils/mutations";
import {
  Sheet,
  Select,
  Option,
  Button,
  Input,
  Typography,
  FormControl,
  FormLabel,
  Textarea,
} from "@mui/joy";

const CreateAssignment = ({ studentId, planId }) => {
  console.log("studentId", studentId);
  console.log("planId", planId);
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
    if (validateForm) {
      event.preventDefault();
      try {
        const { data } = await createAssignment({
          variables: { studentId: studentId, planId: planId, ...formData },
        });
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
    <Sheet sx={{ p: 1, borderRadius: "4px", mt: 1, boxShadow: "md" }}>
      <Typography level="h2">Create Assignment</Typography>
      <form>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input type="text" name="date" id="date" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Exercise Name</FormLabel>
          <Input
            type="text"
            name="exerciseName"
            id="exerciseName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Source</FormLabel>
          <Input
            type="text"
            name="source"
            id="source"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Assignment Type</FormLabel>
          <Select
            defaultValue="etude"
            name="assignmentType"
            id="assignmentType"
          >
            <Option value="technical-exercise">Technical Exercise</Option>
            <Option value="warm-up">Warm Up</Option>
            <Option value="scales">Scales</Option>
            <Option value="piece">Piece</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Special Notes</FormLabel>
          <Textarea
            minRows={3}
            name="specialNotes"
            id="specialNotes"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Metronome</FormLabel>
          <Input
            type="text"
            name="metronome"
            id="metronome"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="pages">Pages</FormLabel>
          <Input type="text" name="pages" id="pages" onChange={handleChange} />
        </FormControl>
        <Button onClick={handleSubmit}>Create Assignment</Button>
      </form>
    </Sheet>
  );
};

export default CreateAssignment;
