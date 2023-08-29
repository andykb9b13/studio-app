import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import { Sheet, Input, Button, Typography, FormHelperText } from "@mui/joy";
import { useStudentContext } from "../../utils/Context";
import { useForm } from "react-hook-form";
import { styles } from "../../styles/cardstyles";

const EditStudent = () => {
  const { student } = useStudentContext();
  const [editStudent, { loading, error }] = useMutation(EDIT_STUDENT);
  const { register, handleSubmit } = useForm();

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
    <Sheet>
      <Typography level="h2">Edit Student</Typography>
      {error && (
        <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Input type="text" {...register("lessonDay")} />
        <Typography>Lesson Time</Typography>
        <Input type="text" {...register("lessonTime")} />
        <Typography>Lesson Location</Typography>
        <Input type="text" {...register("lessonLocation")} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditStudent;
