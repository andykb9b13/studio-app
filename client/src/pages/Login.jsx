import { useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Typography, Input, Card } from "@mui/joy";
import { useForm } from "react-hook-form";

const styles = {
  card: {
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
  },
};

const Login = () => {
  const [login, { error }] = useMutation(LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userInput) => {
    try {
      const { data } = await login({
        variables: { ...userInput },
      });
      Auth.login(data);
      alert("Successfully logged in!");
    } catch (err) {
      console.error(err);
      alert(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Card sx={styles.card}>
      <Typography level="h2">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Email</Typography>
        <Input {...register("email")} placeholder="Email" />
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
      <Typography level="body1" endDecorator={<Link to="/login">Login</Link>}>
        Already a User?
      </Typography>
    </Card>
  );
};

export default Login;
