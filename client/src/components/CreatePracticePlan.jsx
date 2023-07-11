import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../utils/mutations";
import {
  Button,
  Typography,
  Input,
  Sheet,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { StudentContext } from "../pages/StudentDetails";

const CreatePracticePlan = () => {
  const { student } = useContext(StudentContext);

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
          variables: { studentId: student._id, ...formData },
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
    <Sheet
      sx={{ mx: "auto", mt: 3, p: 2, borderRadius: "4px", boxShadow: "md" }}
    >
      <Typography level="h2">Create a Practice Plan</Typography>
      <form>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input type="text" name="name" onChange={handleChange} id="name" />
        </FormControl>
        <Button sx={{ mt: 2 }} onClick={handleSubmit}>
          Create Practice Plan
        </Button>
      </form>
    </Sheet>
  );
};

export default CreatePracticePlan;
