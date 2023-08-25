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
  CardActions,
  FormHelperText,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../styles/cardstyles";

export default function SignUp() {
  const [createTeacher, { error }] = useMutation(ADD_TEACHER);

  // form handling from react-hook-form
  const { register, handleSubmit } = useForm();

  // Logging in the user
  const handleLogin = (data) => {
    Auth.teacherLogin(data);
  };

  // Sending a request to Apollo for the add_teacher mutation
  const onSubmit = async (userInput) => {
    try {
      // data object returned by Apollo
      const { data } = await createTeacher({
        variables: { ...userInput },
      });

      //logging in the user once created
      handleLogin(data);
      console.log("This is data", data);
      alert("Account created!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography level="h2">Sign Up</Typography>
        {error && (
          <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>First Name</Typography>
          <Input placeholder="John" {...register("firstName")} />
          <Typography>Last Name</Typography>
          <Input placeholder="Doe" {...register("lastName")} />
          <Typography>Email</Typography>
          <Input
            placeholder="john@johndoe.com"
            type="email"
            {...register("email")}
          />
          <Typography>Password</Typography>
          <Input type="password" {...register("password")} />
          <Typography>Confirm Password</Typography>
          <Input type="password" {...register("confirmPassword")} />
          <Button type="submit" color="success" variant="soft">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Link to="/">Back to Homepage</Link>
        <Typography level="body1" endDecorator={<Link to="/login">Login</Link>}>
          Already a User?
        </Typography>
      </CardActions>
    </Card>
  );
}
