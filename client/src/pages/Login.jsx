import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { TEACHER_LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Button,
  Typography,
  Input,
  Card,
  FormHelperText,
  Sheet,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../styles/cardstyles";

const Login = () => {
  const [login, { error }] = useMutation(TEACHER_LOGIN); // login mutation from apollo
  const { register, handleSubmit } = useForm(); // form handling from react-hook-form

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
    <Sheet
      id="teacherLoginContainer"
      sx={{
        backgroundColor: "transparent",
        height: "100vh",
      }}
    >
      <Card id="teacherLoginCard" sx={styles.card}>
        <Typography level="h2">Teacher Login</Typography>
        {error && (
          <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
        )}
        <form id="teacherLoginForm" onSubmit={handleSubmit(onSubmit)}>
          <Typography>Email</Typography>
          <Input {...register("email")} placeholder="Email" type="email" />
          <Typography>Password</Typography>
          <Input
            {...register("password")}
            placeholder="password"
            type="password"
          />
          <Button
            id="teacherLoginSubmitBtn"
            type="submit"
            variant="soft"
            color="success"
          >
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
    </Sheet>
  );
};

export default Login;
