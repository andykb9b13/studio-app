import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import { Sheet, Input, Button, Typography, FormHelperText } from "@mui/joy";
import { useStudentContext } from "../../utils/Context";
import { useForm } from "react-hook-form";
import { styles } from "../../styles/studentDetailsStyles";

// Component for displaying the EditStudent modal
const EditStudent = () => {
  const { student } = useStudentContext(); // get student from context
  const [editStudent, { error }] = useMutation(EDIT_STUDENT); // mutation for editing a student
  const { register, handleSubmit } = useForm(); // react-hook-form for handling the form

  // Function for handling the submit of the form and calling the editStudent mutation
  const onSubmit = async (userInput) => {
    try {
      await editStudent({
        variables: {
          studentId: student._id,
          ...userInput,
        },
      });
      alert("Student Successfully Edited!");
    } catch (err) {
      console.error(err);
      alert("Could Not Edit Student");
    }
  };
  return (
    <Sheet id="editStudent" sx={styles.editStudent}>
      <Typography level="h2">Edit Student</Typography>
      {error && (
        <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
      )}
      <form id="editStudentForm" onSubmit={handleSubmit(onSubmit)}>
        <Typography>First Name</Typography>
        <Input
          type="text"
          {...register("firstName")}
          defaultValue={student.firstName}
        />
        <Typography>Last Name</Typography>
        <Input
          type="text"
          {...register("lastName")}
          defaultValue={student.lastName}
        />
        <Typography>Email</Typography>
        <Input
          type="email"
          {...register("email")}
          defaultValue={student.email}
        />
        <Typography>Username</Typography>
        <Input
          type="text"
          {...register("username")}
          defaultValue={student.username}
        />
        <Typography>School</Typography>
        <Input
          type="text"
          {...register("school")}
          defaultValue={student.school}
        />
        <Typography>Grade</Typography>
        <Input
          type="number"
          {...register("grade")}
          defaultValue={student.grade}
        />
        <Typography>Instrument</Typography>
        <Input
          type="text"
          {...register("instrument")}
          defaultValue={student.instrument}
        />
        <Typography>Primary Contact</Typography>
        <Input
          type="text"
          {...register("primaryContact")}
          defaultValue={student.primaryContact}
        />
        <Typography>Primary Contact Email</Typography>
        <Input
          type="text"
          {...register("primaryContactEmail")}
          defaultValue={student.primaryContactEmail}
        />
        <Typography>Lesson Day</Typography>
        <Input
          type="text"
          {...register("lessonDay")}
          defaultValue={student.lessonDay}
        />
        <Typography>Lesson Time</Typography>
        <Input
          type="text"
          {...register("lessonTime")}
          defaultValue={student.lessonTime}
        />
        <Typography>Lesson Location</Typography>
        <Input
          type="text"
          {...register("lessonLocation")}
          defaultValue={student.lessonLocation}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditStudent;
