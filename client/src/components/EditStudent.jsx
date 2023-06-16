import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../utils/mutations";

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
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        {formErrors.username ? (
          <span className="error">{formErrors.username}</span>
        ) : (
          ""
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={handleChange}
        />
        {formErrors.confirmPassword && (
          <span className="error">{formErrors.confirmPassword}</span>
        )}
        <label htmlFor="school">School</label>
        <input type="text" name="school" id="school" onChange={handleChange} />
        <label htmlFor="grade">Grade</label>
        <input type="number" name="grade" id="grade" onChange={handleChange} />
        <label htmlFor="instrument">Instrument</label>
        <input
          type="text"
          name="instrument"
          id="instrument"
          onChange={handleChange}
        />
        <label htmlFor="primaryContact">Primary Contact</label>
        <input
          type="text"
          name="primaryContact"
          id="primaryContact"
          onChange={handleChange}
        />
        <label htmlFor="primaryContactEmail">Primary Contact Email</label>
        <input
          type="text"
          name="primaryContactEmail"
          id="primaryContactEmail"
          onChange={handleChange}
        />
        <label htmlFor="lessonDay">Lesson Day</label>
        <input
          type="text"
          name="lessonDay"
          id="lessonDay"
          onChange={handleChange}
        />
        <label htmlFor="lessonTime">Lesson Time</label>
        <input
          type="text"
          name="lessonTime"
          id="lessonTime"
          onChange={handleChange}
        />
        <label htmlFor="lessonLocation">Lesson Location</label>
        <input
          type="text"
          name="lessonLocation"
          id="lessonLocation"
          onChange={handleChange}
        />
        <button>Edit Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
