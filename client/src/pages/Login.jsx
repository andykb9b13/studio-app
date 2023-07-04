import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Button,
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
} from "@mui/joy";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [login, { errors }] = useMutation(LOGIN);
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await login({
          variables: { ...formData },
        });
        Auth.login(data);
        alert("Successfully logged in!");
      } catch (err) {
        console.error(err);
        alert(err);
        alert("Login failed. Please try again.");
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
    setFormErrors({
      email: "",
      password: "",
    });
  };

  return (
    <Sheet
      sx={{
        width: 400,
        mx: "auto",
        p: 2,
        mt: 4,
        my: 4,
        borderRadius: "sm",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "lg",
        backgroundColor: "lightblue",
      }}
    >
      <Typography level="h2" component="h1">
        Login
      </Typography>
      <FormControl onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && (
          <Typography className="error">{formErrors.email}</Typography>
        )}
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <Typography component="span" className="error">
            {formErrors.password}
          </Typography>
        )}
        <Button type="submit">Login</Button>
      </FormControl>
      <Typography endDecorator={<Link to="/signup">Sign Up</Link>}>
        Not a User?
      </Typography>

      <Link to="/">Back to Homepage</Link>
    </Sheet>
  );
};

export default Login;
