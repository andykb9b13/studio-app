import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import { Sheet, Box, Button, Typography } from "@mui/joy";
// import { useStudentContext } from "../utils/StudentContext";

const TeacherDashboard = () => {
  const logout = (event) => {
    event.preventDefault();
    const loggedOut = Auth.logout();
    if (loggedOut) {
      alert("You are now logged out");
    } else {
      alert("Logout unsuccessful");
    }
  };

  // getting the function update students from the global context StudentContext.jsx
  // const { updateStudents } = useStudentContext();

  // getting the teacher info using the id from the URL parameters
  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  const teacher = data?.teacher || [];
  console.log("This is teacher", teacher.students);

  // setting the global context of the students using the function updateStudents
  // updateStudents(teacher.students);

  return (
    <Sheet>
      {Auth.loggedIn() ? (
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            mx: "auto",
            my: 4,
            backgroundColor: "lightblue",
            borderRadius: "4px",
            boxShadow: "md",
            p: 4,
          }}
        >
          <Typography level="h2" component="h2">
            {teacher.firstName} {teacher.lastName}'s Dashboard
          </Typography>
          <Typography level="h3" component="h3">
            Today's Date:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "400px",
            }}
          >
            <Link>
              <Button>Bookkeeping/Invoices</Button>
            </Link>
            <Link to={`/teacher/studentDatabase/${id}`}>
              <Button>View Student Database </Button>
            </Link>
            <Link>
              <Button>View Calendar</Button>
            </Link>
            <Link to={`/teacher/createSkillSheet/${id}`}>
              <Button>Create Skill Sheet</Button>
            </Link>
            <Button onClick={logout}>Logout</Button>
          </Box>
          <Box>
            <Typography level="h3" component="h3">
              Today's Schedule
            </Typography>
            {/* Insert today's schedule component here */}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography level="h3" component="h3">
            Please Log In
          </Typography>
          <Link to="/login">Login</Link>
        </Box>
      )}
    </Sheet>
  );
};

export default TeacherDashboard;
