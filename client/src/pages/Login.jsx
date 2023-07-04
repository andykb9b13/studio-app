import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/joy";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <Button>This</Button>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Login</button>
      </form>
      <p>Not a User?</p>
      <Link to="/signup">Sign Up</Link>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default Login;
