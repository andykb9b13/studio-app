import React from "react";
import { ADD_STUDENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, Button, Input, FormHelperText } from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../../styles/studentDetailsStyles";

// Component for creating a student
const CreateStudent = ({ teacherId }) => {
  const [createStudent, { error }] = useMutation(ADD_STUDENT); // mutation for creating a student
  const { register, handleSubmit } = useForm(); // react-hook-form for handling the form

  // If there's an error in the mutation, log it to the console
  if (error) {
    console.log(error.message);
  }

  // Function for handling the submit of the form and calling the createStudent mutation
  const onSubmit = async (userInput) => {
    try {
      await createStudent({
        variables: {
          teacherId: teacherId,
          ...userInput,
        },
      });
      alert("Student Successfully Created!");
    } catch (err) {
      console.log(err);
      alert("Could Not Create Student");
    }
  };

  return (
    <Sheet id="createStudent" sx={styles.createStudent}>
      <Typography level="h2" component="h2">
        Add Student
      </Typography>
      <form id="createStudentForm" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
        )}
        <Typography>First Name</Typography>
        <Input type="text" {...register("firstName")} />
        <Typography>Last Name</Typography>
        <Input type="text" {...register("lastName")} />
        <Typography>Email</Typography>
        <Input type="email" {...register("email")} />
        <Typography>Username</Typography>
        <Input type="text" {...register("username")} />
        <Typography>Password</Typography>
        <Input type="password" {...register("password")} />
        <Typography>Confirm Password</Typography>
        <Input type="password" {...register("confirmPassword")} />
        <Typography>School</Typography>
        <Input type="text" {...register("school")} />
        <Typography>Grade</Typography>
        <Input type="number" {...register("grade")} />
        <Typography>Instrument</Typography>
        <Input type="text" {...register("instrument")} />
        <Typography>Primary Contact</Typography>
        <Input type="text" {...register("primaryContact")} />
        <Typography>Primary Contact Email</Typography>
        <Input type="text" {...register("primaryContactEmail")} />
        <Typography>Lesson Day</Typography>
        <Input type="text" {...register("lessonDay")} />
        <Typography>Lesson Time</Typography>
        <Input type="text" {...register("lessonTime")} />
        <Typography>Lesson Location</Typography>
        <Input type="text" {...register("lessonLocation")} />
        <Button type="submit">Add Student</Button>
      </form>
    </Sheet>
  );
};

export default CreateStudent;
