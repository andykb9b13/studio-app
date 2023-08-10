import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import {
  Sheet,
  Input,
  Button,
  Typography,
  Select,
  Option,
  FormHelperText,
} from "@mui/joy";
import { StudentContext } from "../../pages/StudentDetails";
import { useForm } from "react-hook-form";
import { styles } from "../../styles/cardstyles";

const EditStudent = () => {
  const { student } = useContext(StudentContext);
  const [editStudent, { loading, error }] = useMutation(EDIT_STUDENT);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      const { data } = await editStudent({
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
        <Select
          type="text"
          {...register("lessonDay")}
          defaultValue={student.lessonDay}
        >
          <Option value="Monday">Monday</Option>
          <Option value="Tuesday">Tuesday</Option>
          <Option value="Wednesday">Wednesday</Option>
          <Option value="Thursday">Thursday</Option>
          <Option value="Friday">Friday</Option>
          <Option value="Saturday">Saturday</Option>
          <Option value="Sunday">Sunday</Option>
        </Select>
        <Typography>Lesson Time</Typography>
        <Select
          type="text"
          {...register("lessonTime")}
          defaultValue={student.lessonTime}
        >
          <Option value="3:00pm">3:00 PM</Option>
          <Option value="3:15pm">3:15 PM</Option>
          <Option value="3:30pm">3:30 PM</Option>
          <Option value="3:45pm">3:45 PM</Option>
          <Option value="4:00pm">4:00 PM</Option>
          <Option value="4:15pm">4:15 PM</Option>
          <Option value="4:30pm">4:30 PM</Option>
          <Option value="4:45pm">4:45 PM</Option>
          <Option value="5:00pm">5:00 PM</Option>
          <Option value="5:15pm">5:15 PM</Option>
          <Option value="5:30pm">5:30 PM</Option>
          <Option value="5:45pm">5:45 PM</Option>
          <Option value="6:00pm">6:00 PM</Option>
        </Select>
        <Typography>Lesson Location</Typography>
        <Select
          type="text"
          {...register("lessonLocation")}
          defaultValue={student.lessonLocation}
        >
          <Option value="studio">Studio</Option>
          <Option value="zoom">Zoom</Option>
        </Select>
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditStudent;
