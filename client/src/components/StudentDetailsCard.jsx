import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import EditStudent from "../components/EditStudent";
import {
  Typography,
  Button,
  Card,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StudentContext } from "../pages/StudentDetails";
import PracticePlanCard from "./PracticePlanCard";

const styles = {
  sheet: {
    width: "90%",
    mx: "auto",
    backgroundColor: "lightblue",
    mt: 4,
    p: 2,
    borderRadius: "4px",
    boxShadow: "md",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "white",
    mx: "auto",
    width: "100%",
    p: 3,
    my: 2,
    borderRadius: "10px",
  },
};

// the main information about the student
export default function StudentDetailsCard() {
  const { student, id } = useContext(StudentContext);
  const [active, setActive] = useState(0);

  // click handler for opening either the Edit Student or Practice Plan cards
  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Link to={`/teacher/${student.teacherId}`}>
          <ArrowBackIosIcon fontSize="large" />
        </Link>
        <Avatar
          alt={student.firstName + " " + student.lastName}
          src="https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=441&q=80"
          size="lg"
        />
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
        <Typography>
          <b>Teacher ID:</b> {student.teacherId}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/student/${id}/practiceHub`}>
          <Button>To Practice Hub</Button>
        </Link>
        <Button onClick={() => handleClick(2)}>View Practice Plans</Button>
      </CardActions>

      {/* Conditional rendering for button clicks in Card Actions */}
      {active === 1 ? <EditStudent studentId={id} /> : ""}
      {active === 2 ? <PracticePlanCard /> : ""}
    </Card>
  );
}
