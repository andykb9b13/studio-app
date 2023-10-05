import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { TEACHER_LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Typography, Input, Card, FormHelperText } from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../styles/cardstyles";

const Login = () => {
  const [login, { error }] = useMutation(TEACHER_LOGIN);
  // form handling from react-hook-form
  const { register, handleSubmit } = useForm();

  const handleLogin = (data) => {
    Auth.teacherLogin(data);
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
    <>
      <Card sx={styles.card}>
        <Typography level="h2">Teacher Login</Typography>
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
        <Typography
          level="body1"
          endDecorator={<Link to="/signup">Sign Up</Link>}
        >
          Not a User?
        </Typography>
      </Card>
    </>
  );
};

export default Login;
