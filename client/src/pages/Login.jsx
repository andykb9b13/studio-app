import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

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
        Auth.login(data.login.token);
        console.log("data", data);
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <span className="error">{formErrors.password}</span>
        )}
        <button type="submit">Login</button>
      </form>
      <p>Not a User?</p>
      {/* <Link to="/signup">Sign Up</Link>
      <Link to="/">Back to Homepage</Link> */}
    </div>
  );
};

export default Login;
