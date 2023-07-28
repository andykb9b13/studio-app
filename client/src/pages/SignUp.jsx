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
} from "@mui/joy";
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

export default function SignUp() {
  // Experimenting with useFormHook
  const [createTeacher, { error }] = useMutation(ADD_TEACHER);

  // destructure
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This is where the data will be as userInput
  const onSubmit = async (userInput) => {
    console.log(userInput);
    try {
      // data object returned by Apollo
      const { data } = await createTeacher({
        variables: { ...userInput },
      });
      Auth.login(data);
      alert("Account created!");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    // handleSubmit (which is destructured from useForm() will validate inputs before invoking "onSubmit")
    <Sheet>
      <Card sx={styles.card}>
        <CardContent>
          <Typography level="h2">Sign Up</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* You have to register the input. You can choose to register with
          validation  */}
            <Typography>First Name</Typography>
            {errors.firstName && <span>This field is required</span>}
            <Input
              placeholder="John"
              {...register("firstName", { required: true })}
            />
            <Typography>Last Name</Typography>
            {errors.lastName && <span>This field is required</span>}
            <Input
              placeholder="Doe"
              {...register("lastName", { required: true })}
            />
            <Typography>Email</Typography>
            {errors.email && <span>Try that again!</span>}
            <Input
              placeholder="john@johndoe.com"
              {...register("email", {
                required: true,
                pattern: /^([\da-z\w]+)@([\da-z\w]+)\.([\da-z\w]+)$/,
              })}
            />
            <Typography>Password</Typography>
            {errors.password && <span>This field is required</span>}
            <Input
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Typography>Confirm Password</Typography>
            {errors.confirmPassword && <span>This field is required</span>}
            <Input
              type="password"
              {...register("confirmPassword", { required: true })}
            />
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
