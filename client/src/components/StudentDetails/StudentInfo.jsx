import React, { useContext } from "react";
import { Typography, Box } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import { StudentContext } from "../../pages/StudentDetails";

const StudentInfo = ({ handleClick }) => {
  const { student } = useContext(StudentContext);
  return (
    <Box paddingLeft={4}>
      <Typography
        level="h2"
        component="h2"
        endDecorator={<EditIcon onClick={() => handleClick(1)} />}
      >
        {student.firstName} {student.lastName}
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
        <b>Lesson Day:</b> {student.lessonDay}
      </Typography>
      <Typography>
        <b>Lesson Time:</b> {student.lessonTime}
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
      <Typography>
        <b>Is Active:</b> {student.isActive}
      </Typography>
    </Box>
  );
};

export default StudentInfo;
