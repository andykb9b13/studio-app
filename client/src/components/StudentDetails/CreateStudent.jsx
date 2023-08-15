import React from "react";
import { ADD_STUDENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, Button, Input, FormHelperText } from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../../styles/cardstyles";

const CreateStudent = ({ teacherId }) => {
  const [createStudent, { error }] = useMutation(ADD_STUDENT);
  if (error) {
    console.log(error.message);
  }

  const { register, handleSubmit } = useForm();

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
    <Sheet sx={{ p: 1, mt: 1, borderRadius: "4px", boxShadow: "lg" }}>
      <Typography level="h2" component="h2">
        Add Student
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
