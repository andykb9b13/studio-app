import React, { useState, createContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import CreatePracticePlan from "../components/CreatePracticePlan";
import PracticePlan from "../components/PracticePlan";
import EditStudent from "../components/EditStudent";
import StudentDetailsMenu from "../components/StudentDetailsMenu";
import {
  Sheet,
  Typography,
  Button,
  Card,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

// import { useStudentContext } from "../utils/StudentContext";
export const StudentContext = createContext();

const StudentDetails = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });
  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  const handlePlanClick = () => {
    setOpen(!open);
  };
  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <StudentContext.Provider value={{ student, practicePlans, id }}>
      <Sheet
        sx={{
          width: "90%",
          mx: "auto",
          backgroundColor: "lightblue",
          mt: 4,
          p: 2,
          borderRadius: "4px",
          boxShadow: "md",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography level="h1" component="h1" mx="auto">
          Student Details
        </Typography>
        {/* Main student details section  */}
        <Card
          sx={{
            backgroundColor: "white",
            mx: "auto",
            width: "90%",
            p: 3,
            my: 2,
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <StudentDetailsMenu student={student} id={id} />
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
            <Button onClick={() => handleClick(2)}>View Practice Plans</Button>
          </CardActions>

          {/* Conditional rendering for button clicks in Card Actions */}
          {active === 1 ? <EditStudent studentId={id} /> : ""}
          {active === 2 ? (
            <React.Fragment>
              <Typography level="h2">Practice Plans</Typography>
              <Button onClick={() => handlePlanClick()}>
                Create Practice Plan
              </Button>
              {open ? <CreatePracticePlan studentId={id} /> : ""}
              {practicePlans &&
                practicePlans.map((practicePlan, i) => (
                  <PracticePlan
                    practicePlan={practicePlan}
                    studentId={id}
                    key={i}
                  />
                ))}
            </React.Fragment>
          ) : (
            ""
          )}
        </Card>
      </Sheet>
    </StudentContext.Provider>
  );
};

export default StudentDetails;
