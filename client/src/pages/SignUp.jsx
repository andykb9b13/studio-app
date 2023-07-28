import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_TEACHER } from "../utils/mutations";
import {
  Card,
  Input,
  Typography,
  Button,
  CardContent,
  Sheet,
  CardActions,
  FormHelperText,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchemas } from "../hooks/useSchemas";

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

export default function SignUp() {
  const [createTeacher, { error }] = useMutation(ADD_TEACHER);

  // form validation from yup
  const { signInSchema } = useSchemas();

  // form handling from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  // Sending a request to Apollo
  const onSubmit = async (userInput) => {
    console.log(userInput);
    try {
      // data object returned by Apollo
      const { data } = await createTeacher({
        variables: { ...userInput },
      });
      Auth.login(data); //signing in the user once created
      alert("Account created!");
    } catch (err) {
      alert(err);
    }
  };

  return (
    // handleSubmit (which is destructured from useForm()) will validate inputs before invoking "onSubmit"
    <Sheet>
      <Card sx={styles.card}>
        <CardContent>
          <Typography level="h2">Sign Up</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>First Name</Typography>
            <FormHelperText>{errors.firstName?.message}</FormHelperText>
            <Input placeholder="John" {...register("firstName")} />
            <Typography>Last Name</Typography>
            <FormHelperText>{errors.lastName?.message}</FormHelperText>
            <Input placeholder="Doe" {...register("lastName")} />
            <Typography>Email</Typography>
            <FormHelperText>{errors.email?.message}</FormHelperText>
            <Input
              placeholder="john@johndoe.com"
              type="email"
              {...register("email")}
            />
            <Typography>Password</Typography>
            <FormHelperText>{errors.password?.message}</FormHelperText>
            <Input type="password" {...register("password")} />
            <Typography>Confirm Password</Typography>
            <FormHelperText color="danger">
              {errors.confirmPassword?.message}
            </FormHelperText>
            <Input type="password" {...register("confirmPassword")} />
            <Button type="submit" color="success" variant="soft">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardActions>
          <Link to="/">Back to Homepage</Link>
          <Typography
            level="body1"
            endDecorator={<Link to="/login">Login</Link>}
          >
            Already a User?
          </Typography>
        </CardActions>
      </Card>
    </Sheet>
  );
}
