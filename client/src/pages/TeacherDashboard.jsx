import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import StudentDatabaseTable from "../components/StudentDatabaseTable";
import StudentSearch from "../components/StudentSearch";
import CreateSkillSheet from "../components/CreateSkillSheet";
import CreateStudent from "../components/CreateStudent";
import {
  Sheet,
  Button,
  Typography,
  Card,
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from "@mui/joy";

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

  const students = data?.teacher.students || [];
  const [clicked, setClicked] = useState(false);
  const [studentSearch, setStudentSearch] = useState(students);

  const handleClick = (event) => {
    setClicked(!clicked);
  };

  const teacher = data?.teacher || [];
  console.log("This is teacher", teacher.students);

  return (
    <Sheet>
      {Auth.loggedIn() ? (
        <Sheet
          sx={{
            minWidth: "80%",
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
          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            sx={{ borderRadius: "lg" }}
          >
            <TabList>
              <Tab>View Student Database</Tab>
              <Tab>Bookkeeping/Invoices</Tab>
              <Tab>Skillsheets</Tab>
              <Tab>View Calendar</Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 2 }}>
              <StudentSearch
                students={students}
                setStudentSearch={setStudentSearch}
              />
              <StudentDatabaseTable students={studentSearch} />
              <Button
                onClick={() => {
                  handleClick();
                }}
                sx={{ my: 2 }}
              >
                {clicked ? "Cancel" : "Add Student"}
              </Button>
              {clicked ? <CreateStudent teacherId={id} /> : ""}
            </TabPanel>
            <TabPanel value={1} sx={{ p: 2 }}>
              Bookkeeping and Invoices are under construction
            </TabPanel>
            <TabPanel value={2} sx={{ p: 2 }}>
              <CreateSkillSheet />
            </TabPanel>
            <TabPanel value={3} sx={{ p: 2 }}>
              View Calendar is under construction
            </TabPanel>
          </Tabs>
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
