import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_TEACHER } from "../utils/mutations";
import {
  Card,
  Input,
  FormLabel,
  Typography,
  Button,
  FormControl,
  FormHelperText,
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
    watch,
    formState: { errors },
  } = useForm();

  // This is where the data will be
  const onSubmit = async (userInput) => {
    console.log(userInput);
    try {
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
  // console.log(watch("exampleRequired"));
  // console.log(watch("example")); // watch the input value by passing the name to it. The input is named "example". Watch is destructured from useForm()

  return (
    // handleSubmit (which is destructured from useForm() will validate inputs before invoking "onSubmit")
    <Sheet>
      <Card sx={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* You have to register the input. You can choose to register with
          validation  */}
          {errors.firstName && <span>This field is required</span>}
          <Input
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.lastName && <span>This field is required</span>}
          <Input
            placeholder="Last Name"
            {...register("lastName", { required: true })}
          />
          {errors.email && <span>Try that again!</span>}
          <Input
            placeholder="john@johndoe.com"
            {...register("email", {
              required: true,
              pattern: /^([\da-z\w]+)@([\da-z\w]+)\.([\da-z\w]+)$/,
            })}
          />
          {errors.password && <span>errors.password</span>}
          <Input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.confirmPassword && <span>This field is required</span>}
          <Input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <Input type="submit" variant="soft">
            Submit
          </Input>
        </form>
      </Card>
    </Sheet>
  );
}

// A place to hold all of the data that's in danger of being deleted FOREVER!!!
const HoldingCell = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [createTeacher, { error }] = useMutation(ADD_TEACHER);
  const validated = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your Last Name";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Please enter your password";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    console.log("isValid", isValid);
    console.log("formData", formData);

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await createTeacher({
          variables: { ...formData },
        });
        Auth.login(data.addTeacher.token);
        alert("Account created!");
      } catch (err) {
        console.error(err);
        alert(err);
      }
      handleClear();
    }
  };
  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Card
      sx={{
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
      }}
    >
      <Typography level="h2">Sign Up</Typography>
      <CardContent>
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </FormControl>
        {formErrors.confirmPassword && (
          <FormHelperText className="error">
            {formErrors.confirmPassword}
          </FormHelperText>
        )}
      </CardContent>
      <CardActions>
        <Button type="submit" onClick={handleSubmit} color="success">
          Sign Up
        </Button>
        <Link to="/">
          <Button color="danger">Cancel</Button>
        </Link>
        <Typography level="body1" endDecorator={<Link to="/login">Login</Link>}>
          Already a User?
        </Typography>
      </CardActions>
    </Card>
  );
};
