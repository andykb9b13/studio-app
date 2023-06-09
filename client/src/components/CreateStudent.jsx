import React, { useState } from "react";
import { ADD_STUDENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import {
  Sheet,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  Option,
} from "@mui/joy";

const CreateStudent = ({ teacherId }) => {
  const [createStudent, { errors }] = useMutation(ADD_STUDENT);

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
        const { data } = await createStudent({
          variables: {
            teacherId: teacherId,
            ...formData,
          },
        });
        console.log("Data from createStudent", data);
        alert("Student Successfully Created!");
      } catch (err) {
        console.error(err);
        alert("Could Not Create Student");
      }
    }
  };

  return (
    <Sheet sx={{ p: 1, mt: 1, borderRadius: "4px", boxShadow: "lg" }}>
      <Typography level="h2" component="h2">
        Add Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" id="email" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
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
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
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
          <FormLabel>School</FormLabel>
          <Input
            type="text"
            name="school"
            id="school"
            onChange={handleChange}
          />
        </FormControl>{" "}
        <FormControl>
          <FormLabel>Grade</FormLabel>
          <Input
            type="number"
            name="grade"
            id="grade"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Instrument</FormLabel>
          <Select defaultValue="trombone" name="instrument" id="instrument">
            <Option value="trombone">Trombone</Option>
            <Option value="bass-guitar">Bass Guitar</Option>
            <Option value="euphonium">Euphonium</Option>
            <Option value="trumpet">Trumpet</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Primary Contact</FormLabel>
          <Input
            type="text"
            name="primaryContact"
            id="primaryContact"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Primary Contact Email</FormLabel>
          <Input
            type="text"
            name="primaryContactEmail"
            id="primaryContactEmail"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Lesson Day</FormLabel>
          <Select defaultValue="monday">
            <Option value="monday">Monday</Option>
            <Option value="tuesday">Tuesday</Option>
            <Option value="wednesday">Wednesday</Option>
            <Option value="thursday">Thursday</Option>
            <Option value="friday">Friday</Option>
            <Option value="saturday">Saturday</Option>
            <Option value="sunday">Sunday</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Lesson Time</FormLabel>
          <Select defaultValue="3:00pm">
            <Option value="3:00pm">3:00pm</Option>
            <Option value="3:15pm">3:15pm</Option>
            <Option value="3:30pm">3:30pm</Option>
            <Option value="3:45pm">3:45pm</Option>
            <Option value="4:00pm">4:00pm</Option>
            <Option value="4:15pm">4:15pm</Option>
            <Option value="4:30pm">4:30pm</Option>
            <Option value="4:45pm">4:45pm</Option>
            <Option value="5:00pm">5:00pm</Option>
            <Option value="5:15pm">5:15pm</Option>
            <Option value="5:30pm">5:30pm</Option>
            <Option value="5:45pm">5:45pm</Option>
            <Option value="6:00pm">6:00pm</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Lesson Location</FormLabel>
          <Select defaultValue="in-person">
            <Option value="in-person">In Person</Option>
            <Option value="zoom">Zoom</Option>
          </Select>
        </FormControl>
        <Button>Add Student</Button>
      </form>
    </Sheet>
  );
};

export default CreateStudent;
