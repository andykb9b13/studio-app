import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Sheet, Button, Typography, Box, Card } from "@mui/joy";

const Home = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };

  return (
    <Sheet
      sx={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        my: 6,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "lg",
        p: 4,
        backgroundColor: "lightblue",
        borderRadius: "4px",
      }}
    >
      <Typography level="h1" component="h1">
        Studio Management App
      </Typography>
      <Typography level="h2" component="h2">
        Welcome!
      </Typography>
      <Typography level="h6" component="p">
        Welcome to the Studio Management App. The one place where you can manage
        all of your music studio needs so that your lessons can be more
        efficient, productive, and versitile.
      </Typography>
      <ul>
        <li>Create your own student databse</li>
        <li>Create assignment plans for you students</li>
        <li>Track your students' progress</li>
        <li>
          Use the Troubleshooting hub to help students identify what needs work
        </li>
        <li>Access external resources for students</li>
      </ul>
      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        {Auth.loggedIn() && (
          <Box>
            <Button onClick={logout}>Logout</Button>
            <Button>Go to profile "not active yet"</Button>
          </Box>
        )}
        <Link to="/signup">
          <Button>Teacher Sign Up</Button>
        </Link>
      </Box>
    </Sheet>
  );
};

export default Home;
