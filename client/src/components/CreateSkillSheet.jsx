import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ADD_SKILLSHEET } from "../utils/mutations";
import {
  Sheet,
  Card,
  Grid,
  Input,
  FormControl,
  FormLabel,
  Typography,
  Divider,
  Button,
  CardContent,
  CardActions,
} from "@mui/joy";

const CreateSkillSheet = () => {
  const { id } = useParams();
  console.log("teacherId in CreateSkillSheet", id);

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
    if (validateForm()) {
      event.preventDefault();
      try {
        const { data } = await createSkillSheet({
          variables: { teacherId: id, ...formData },
        });
        console.log(data);
        alert("Skill sheet successfully created!");
      } catch (err) {
        alert("Could not create skill sheet");
        console.error(err);
      }
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        // to make the demo resizable
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h1">Create Skill Sheet</Typography>
      <Divider inset="none" />
      <CardContent>
        <form>
          <FormControl>
            <FormLabel htmlFor="sheetName">Sheet Name</FormLabel>
            <Input
              type="text"
              name="sheetName"
              id="sheetName"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="scales">Scales</FormLabel>
            <Input
              type="text"
              name="scales"
              id="scales"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="arpeggios">Arpeggios</FormLabel>
            <Input
              type="text"
              name="arpeggios"
              id="arpeggios"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="articulation">Articulation</FormLabel>
            <Input
              type="text"
              name="articulation"
              id="articulation"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="slurs">Slurs</FormLabel>
            <Input
              type="text"
              name="slurs"
              id="slurs"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="longTones">Long Tones</FormLabel>
            <Input
              type="text"
              name="longTones"
              id="longTones"
              onChange={handleChange}
            />
          </FormControl>
          <FormLabel htmlFor="exercises">Exercises</FormLabel>
          <Input
            type="text"
            name="exercises"
            id="exercises"
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel htmlFor="etudes">Etudes</FormLabel>
            <Input
              type="text"
              name="etudes"
              id="etudes"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pieces">Pieces</FormLabel>
            <Input
              type="text"
              name="pieces"
              id="pieces"
              onChange={handleChange}
            />
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        {" "}
        <Button onClick={handleSubmit}>Create Skill Sheet</Button>
        <Link to={`/teacher/${id}`}>
          <Button>Cancel</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CreateSkillSheet;
