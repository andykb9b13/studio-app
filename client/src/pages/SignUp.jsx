import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form action="submit">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button>Sign Up</button>
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
      <p>Already a User?</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default SignUp;
