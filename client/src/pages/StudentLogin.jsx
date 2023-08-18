import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { STUDENT_LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Typography, Input, Card, FormHelperText } from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../styles/cardstyles";

const StudentLogin = () => {
  const [login, { error }] = useMutation(STUDENT_LOGIN);
  // form handling from react-hook-form

  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    Auth.studentLogin(data);
    alert("Successfully logged in!");
  };

  // Sending a request to Apollo for the login mutation
  const onSubmit = async (userInput) => {
    try {
      // data object returned by apollo
      const { data } = await login({
        variables: { ...userInput },
      });
      // logging in the user
      handleLogin(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={styles.card}>
      <Typography level="h2">Student Login</Typography>
      {error && (
        <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Email</Typography>
        <Input {...register("email")} placeholder="Email" type="email" />
        <Typography>Password</Typography>
        <Input
          {...register("password")}
          placeholder="password"
          type="password"
        />
        <Button type="submit" variant="soft" color="success">
          Login
        </Button>
      </form>
      <Link to="/">Back to Homepage</Link>
    </Card>
  );
};

export default StudentLogin;
