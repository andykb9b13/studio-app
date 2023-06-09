import React, { useEffect, useState } from "react";
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
import StorageIcon from "@mui/icons-material/Storage";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const handleClick = (event) => {
    setClicked(!clicked);
  };

  const teacher = data?.teacher || [];
  console.log("This is teacher", teacher.students);

  return (
    <Sheet>
      {Auth.loggedIn() ? (
        <Sheet>
          <Typography level="h2" component="h2" sx={{ mx: "auto" }}>
            {teacher.firstName} {teacher.lastName}'s Dashboard
          </Typography>
          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            sx={{ borderRadius: "lg" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <TabList color="primary">
              <Tab>
                {!isMobile && <Typography>Student Database</Typography>}
                <StorageIcon />
              </Tab>
              <Tab>
                {!isMobile && <Typography>Bookkeeping/Invoices</Typography>}
                <RequestQuoteIcon />
              </Tab>
              <Tab>
                {!isMobile && <Typography>SkillSheets</Typography>}
                <BuildIcon />
              </Tab>
              <Tab>
                {!isMobile && <Typography>View Calendar</Typography>}
                <CalendarMonthIcon />
              </Tab>
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
