import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TEACHER } from "../../../utils/mutations";
import {
  Sheet,
  Input,
  Button,
  Typography,
  FormHelperText,
  Textarea,
} from "@mui/joy";
import { useTeacherContext } from "../../../utils/Context";
import { useForm } from "react-hook-form";
import { styles } from "../../../styles/cardstyles";

const EditTeacher = ({ setActive }) => {
  const { teacher, setTeacher } = useTeacherContext();
  const [editTeacher, { loading, error }] = useMutation(EDIT_TEACHER);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      const editedTeacher = await editTeacher({
        variables: {
          teacherId: teacher._id,
          ...userInput,
        },
      });
      setTeacher(editedTeacher.data.editTeacher);
      setActive(null);
      alert("Teacher successfully edited!");
    } catch (err) {
      console.error(err);
      alert("Could not edit teacher");
      setActive(null);
    }
  };

  return (
    <Sheet
      sx={{
        p: 1,
        borderRadius: "4px",
        mt: 1,
        boxShadow: "md",
        maxHeight: "max-content",
        width: "80vw",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h2">Edit Teacher</Typography>
      {error && (
        <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>First Name</Typography>
        <Input
          type="text"
          {...register("firstName")}
          defaultValue={teacher.firstName}
        />
        <Typography>Last Name</Typography>
        <Input
          type="text"
          {...register("lastName")}
          defaultValue={teacher.lastName}
        />
        <Typography>Email</Typography>
        <Input
          type="email"
          {...register("email")}
          defaultValue={teacher.email}
        />
        <Typography>About Info</Typography>
        <Textarea
          minRows={3}
          {...register("aboutInfo")}
          defaultValue={teacher.aboutInfo}
        />
        <Typography>Phone Number</Typography>
        <Input
          type="text"
          {...register("phoneNumber")}
          defaultValue={teacher.phoneNumber}
        />
        <Typography>Username</Typography>
        <Input
          type="text"
          {...register("username")}
          defaultValue={teacher.username}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditTeacher;
