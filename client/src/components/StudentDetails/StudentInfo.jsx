import React from "react";
import { Typography, Card } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import { useStudentContext } from "../../utils/Context";
import { styles } from "../../styles/studentDetailsStyles";

const StudentInfo = ({ handleClick, teacher }) => {
  const { student } = useStudentContext();

  return (
    <Card sx={styles.card}>
      <Typography
        level="h2"
        component="h2"
        endDecorator={<EditIcon onClick={() => handleClick(1)} />}
      >
        {student.firstName} {student.lastName}
      </Typography>
      <Typography>
        <b>Teacher:</b> {teacher.firstName} {teacher.lastName}
      </Typography>
      <Typography>
        <b>Email:</b> {student.email}
      </Typography>
      <Typography>
        <b>Primary Contact:</b> {student.primaryContact}
      </Typography>
      <Typography>
        <b>Primary Contact Email:</b> {student.primaryContactEmail}
      </Typography>
      <Typography>
        <b>Instrument:</b> {student.instrument}
      </Typography>
      <Typography>
        <b>Grade:</b> {student.grade}
      </Typography>
      <Typography>
        <b>School:</b> {student.school}
      </Typography>
      <Typography>
        <b>Lesson Location:</b> {student.lessonLocation}
      </Typography>
    </Card>
  );
};

export default StudentInfo;
