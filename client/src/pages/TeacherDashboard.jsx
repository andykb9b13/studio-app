import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import { Sheet, Box, Button, Typography, Card } from "@mui/joy";

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

  // getting the teacher info using the id from the URL parameters
  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  const teacher = data?.teacher || [];
  console.log("This is teacher", teacher.students);

  return (
    <Sheet>
      {Auth.loggedIn() ? (
        <Sheet
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

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "auto",
              my: 2,
              mx: "auto",
              width: "75%",
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
          </Card>

          <Card>
            <Typography level="h3" component="h3">
              Today's Schedule
            </Typography>
            {/* Insert today's schedule component here */}
          </Card>
        </Sheet>
      ) : (
        <Card>
          <Typography level="h3" component="h3">
            Please Log In
          </Typography>
          <Link to="/login">Login</Link>
        </Card>
      )}
    </Sheet>
  );
};

export default TeacherDashboard;
