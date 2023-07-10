import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import CreatePracticePlan from "../components/CreatePracticePlan";
import PracticePlan from "../components/PracticePlan";
import EditStudent from "../components/EditStudent";
import DeleteStudentModal from "../components/DeleteStudentModal";
import { Sheet, Box, Typography, Button } from "@mui/joy";
// import { useStudentContext } from "../utils/StudentContext";

const StudentDetails = () => {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <Sheet
      sx={{
        width: "75%",
        mx: "auto",
        backgroundColor: "lightblue",
        mt: 4,
        p: 2,
        borderRadius: "4px",
        boxShadow: "md",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography level="h1" component="h1" mx="auto">
        Student Details
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          mx: "auto",
          width: "75%",
          p: 3,
          my: 2,
          borderRadius: "10px",
        }}
      >
        <Typography level="h2" component="h2">
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
      </Box>
      {/* Need to create Edit student page and add it to App.js */}
      <Box
        sx={{
          width: "75%",
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          flexDirection: "inline-block",
        }}
      >
        <Link to={`/teacher/studentDatabase/${student.teacherId}`}>
          <Button onClick={() => handleClick(0)}>Back to Database</Button>
        </Link>
        <Button onClick={() => handleClick(1)}>Edit Student</Button>
        <Button onClick={() => handleClick(2)}>View Practice Plans</Button>
        <Button onClick={() => handleClick(3)}>Create Practice Plan</Button>
        <DeleteStudentModal studentId={id} />
        <Link to={`/student/${id}/practiceHub`}>
          <Button>To Practice Hub</Button>
        </Link>
      </Box>

      {active === 1 ? (
        <Sheet
          sx={{
            mx: "auto",
            mt: 3,
            p: 2,
            borderRadius: "4px",
            boxShadow: "md",
            width: "80%",
          }}
        >
          <EditStudent studentId={id} />{" "}
        </Sheet>
      ) : (
        ""
      )}
      {active === 2 ? (
        <Sheet
          sx={{ mx: "auto", mt: 3, p: 2, borderRadius: "4px", boxShadow: "md" }}
        >
          <Typography level="h2">Practice Plans</Typography>
          {practicePlans &&
            practicePlans.map((practicePlan, i) => (
              <PracticePlan
                practicePlan={practicePlan}
                studentId={id}
                key={i}
              />
            ))}
        </Sheet>
      ) : (
        ""
      )}
      {active === 3 ? <CreatePracticePlan studentId={id} /> : ""}
    </Sheet>
  );
};

export default StudentDetails;
