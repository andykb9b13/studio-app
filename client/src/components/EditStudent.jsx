import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../utils/mutations";
import {
  Sheet,
  Box,
  Input,
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";

const EditStudent = ({ studentId }) => {
  const [editStudent] = useMutation(EDIT_STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    grade: "",
    instrument: "",
    primaryContact: "",
    primaryContactEmail: "",
    lessonDay: "",
    lessonTime: "",
    lessonLocation: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter a first name";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter a last name";
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter an email address";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter a password";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Your passwords do not match";
      isValid = false;
    }

    if (formData.username.length < 8) {
      errors.username = "Your username must be at least 8 characters long";
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm) {
      try {
        const { data } = await editStudent({
          variables: {
            studentId: studentId,
            ...formData,
          },
        });
        console.log("Data from createStudent", data);
        alert("Student Successfully Edited!");
      } catch (err) {
        console.error(err);
        alert("Could Not Edit Student");
      }
    }
  };
  return (
    <Sheet>
      <Typography level="h2">Edit Student</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" name="email" id="email" onChange={handleChange} />
        </FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        {formErrors.username ? (
          <FormHelperText className="error">
            {formErrors.username}
          </FormHelperText>
        ) : (
          ""
        )}
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          {formErrors.confirmPassword && (
            <FormHelperText className="error">
              {formErrors.confirmPassword}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="school">School</FormLabel>
          <Input
            type="text"
            name="school"
            id="school"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="grade">Grade</FormLabel>
          <Input
            type="number"
            name="grade"
            id="grade"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="instrument">Instrument</FormLabel>
          <Input
            type="text"
            name="instrument"
            id="instrument"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl></FormControl>
        <FormLabel htmlFor="primaryContact">Primary Contact</FormLabel>
        <Input
          type="text"
          name="primaryContact"
          id="primaryContact"
          onChange={handleChange}
        />
        <FormControl>
          <FormLabel htmlFor="primaryContactEmail">
            Primary Contact Email
          </FormLabel>
          <Input
            type="text"
            name="primaryContactEmail"
            id="primaryContactEmail"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonDay">Lesson Day</FormLabel>
          <Input
            type="text"
            name="lessonDay"
            id="lessonDay"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonTime">Lesson Time</FormLabel>
          <Input
            type="text"
            name="lessonTime"
            id="lessonTime"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonLocation">Lesson Location</FormLabel>
          <Input
            type="text"
            name="lessonLocation"
            id="lessonLocation"
            onChange={handleChange}
          />
        </FormControl>
        <Button>Edit Student</Button>
      </form>
    </Sheet>
  );
};

export default EditStudent;
