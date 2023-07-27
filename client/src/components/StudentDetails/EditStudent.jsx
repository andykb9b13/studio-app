import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import {
  Sheet,
  Box,
  Input,
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Option,
} from "@mui/joy";
import { StudentContext } from "../../pages/StudentDetails";

const EditStudent = () => {
  const { student } = useContext(StudentContext);
  const [editStudent] = useMutation(EDIT_STUDENT);
  const [formData, setFormData] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    username: student.username,
    school: student.school,
    grade: student.grade,
    instrument: student.instrument,
    primaryContact: student.primaryContact,
    primaryContactEmail: student.primaryContactEmail,
    lessonDay: student.lessonDay,
    lessonTime: student.lessonTime,
    lessonLocation: student.lessonLocation,
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
            studentId: student._id,
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
            defaultValue={formData.firstName}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            defaultValue={formData.lastName}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            defaultValue={formData.email}
          />
        </FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          defaultValue={formData.username}
        />
        {formErrors.username ? (
          <FormHelperText className="error">
            {formErrors.username}
          </FormHelperText>
        ) : (
          ""
        )}
        <FormControl>
          <FormLabel htmlFor="school">School</FormLabel>
          <Input
            type="text"
            name="school"
            id="school"
            onChange={handleChange}
            defaultValue={formData.school}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="grade">Grade</FormLabel>
          <Input
            type="number"
            name="grade"
            id="grade"
            onChange={handleChange}
            defaultValue={formData.grade}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="instrument">Instrument</FormLabel>
          <Input
            type="text"
            name="instrument"
            id="instrument"
            onChange={handleChange}
            defaultValue={formData.instrument}
          />
        </FormControl>
        <FormControl></FormControl>
        <FormLabel htmlFor="primaryContact">Primary Contact</FormLabel>
        <Input
          type="text"
          name="primaryContact"
          id="primaryContact"
          onChange={handleChange}
          defaultValue={formData.primaryContact}
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
            defaultValue={formData.primaryContactEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonDay">Lesson Day</FormLabel>
          <Select
            name="lessonDay"
            id="lessonDay"
            onChange={handleChange}
            defaultValue={formData.lessonDay}
          >
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
            <Option value="Sunday">Sunday</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonTime">Lesson Time</FormLabel>
          <Select
            name="lessonTime"
            id="lessonTime"
            onChange={handleChange}
            defaultValue={formData.lessonTime}
          >
            <Option value="3:00pm">3:00 PM</Option>
            <Option value="3:15pm">3:15 PM</Option>
            <Option value="3:30pm">3:30 PM</Option>
            <Option value="3:45pm">3:45 PM</Option>
            <Option value="4:00pm">4:00 PM</Option>
            <Option value="4:15pm">4:15 PM</Option>
            <Option value="4:30pm">4:30 PM</Option>
            <Option value="4:45pm">4:45 PM</Option>
            <Option value="5:00pm">5:00 PM</Option>
            <Option value="5:15pm">5:15 PM</Option>
            <Option value="5:30pm">5:30 PM</Option>
            <Option value="5:45pm">5:45 PM</Option>
            <Option value="6:00pm">6:00 PM</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lessonLocation">Lesson Location</FormLabel>
          <Select
            name="lessonLocation"
            id="lessonLocation"
            onChange={handleChange}
            defaultValue={formData.lessonLocation}
          >
            <Option value="studio">Studio</Option>
            <Option value="zoom">Zoom</Option>
          </Select>
        </FormControl>
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditStudent;
