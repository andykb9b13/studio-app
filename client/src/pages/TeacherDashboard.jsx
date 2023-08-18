import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import { DELETE_TEACHER } from "../utils/mutations";
import { MobileContext } from "../App";
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
import StudentDatabaseTable from "../components/TeacherDashboard/StudentDatabase/StudentDatabaseTable";
import StudentSearch from "../components/TeacherDashboard/StudentDatabase/StudentSearch";
import SkillSheetContainer from "../components/TeacherDashboard/SkillSheets/SkillSheetContainer";
import CreateStudent from "../components/StudentDetails/CreateStudent";
import Calendar from "../components/TeacherDashboard/Calendar/Calendar";
import Navbar from "../components/Navbar/Navbar";
import RegularModal from "../components/common/Modal/RegularModal";
import DeleteModalContent from "../components/common/Modal/DeleteModalContent";
import StorageIcon from "@mui/icons-material/Storage";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const TeacherContext = createContext();

const TeacherDashboard = () => {
  // getting the teacher info using the id from the URL parameters
  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });
  const [deleteTeacher, { error }] = useMutation(DELETE_TEACHER);

  // Setting variables for teacher information and student information
  const students = data?.teacher.students || [];
  const teacher = data?.teacher || [];
  const [studentSearch, setStudentSearch] = useState(students);

  // handler for the tabs
  const [clicked, setClicked] = useState(false);
  // handler for the modal
  const [open, setOpen] = useState(false);
  // checking if the screen size is mobile
  const { isMobile } = useContext(MobileContext);

  // Handles the panel
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  // Setting the students to be displayed initially
  useEffect(() => {
    setStudentSearch(teacher.students);
  }, [teacher.students]);

  const deleteTeacherFunc = async () => {
    await deleteTeacher({
      variables: {
        teacherId: id,
      },
    });
    alert("Account Deleted!");
    setOpen(false);
    window.location.assign(`/`);
  };

  return (
    <TeacherContext.Provider value={{ teacher }}>
      <Sheet>
        <Navbar />
        {Auth.loggedIn() ? (
          <Sheet sx={{ mt: 2 }}>
            <RegularModal open={open} onRequestClose={() => setOpen(false)}>
              <DeleteModalContent
                onRequestClose={() => setOpen(false)}
                confirmAction={() => deleteTeacherFunc()}
                resourceName="teacher"
              />
            </RegularModal>
            <Button onClick={() => setOpen(true)} color="danger">
              Delete Account
            </Button>
            {/* These tabs function as the Navbar */}
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              sx={{ borderRadius: "lg" }}
              variant="scrollable"
              scrollbuttons="auto"
            >
              <TabList color="primary">
                {/* Tabs have conditional rendering for screen size. Will only display the icon at mobile sizes */}
                <Tab>
                  {!isMobile && (
                    <Typography>
                      <b>Student Database</b>
                    </Typography>
                  )}
                  <StorageIcon />
                </Tab>
                <Tab>
                  {!isMobile && (
                    <Typography>
                      <b>Bookkeeping/Invoices</b>
                    </Typography>
                  )}
                  <RequestQuoteIcon />
                </Tab>
                <Tab>
                  {!isMobile && (
                    <Typography>
                      <b>SkillSheets</b>
                    </Typography>
                  )}
                  <BuildIcon />
                </Tab>
                <Tab>
                  {!isMobile && (
                    <Typography>
                      <b>View Calendar</b>
                    </Typography>
                  )}
                  <CalendarMonthIcon />
                </Tab>
              </TabList>

              {/* Panel for student database view (includes student search) */}
              <TabPanel value={0} sx={{ p: 2 }}>
                <StudentSearch
                  students={students}
                  setStudentSearch={setStudentSearch}
                />
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                  sx={{ my: 2 }}
                >
                  {clicked ? "Cancel" : "Add Student"}
                </Button>

                {clicked ? <CreateStudent teacherId={id} /> : ""}
                <StudentDatabaseTable students={studentSearch} />
              </TabPanel>

              {/* Tab panel for bookkeeping and invoices */}
              <TabPanel value={1} sx={{ p: 2 }}>
                Bookkeeping and Invoices are under construction
              </TabPanel>

              {/* Tab panel for Skill sheets */}
              <TabPanel value={2} sx={{ p: 2 }}>
                <SkillSheetContainer teacher={teacher} />
              </TabPanel>

              {/* Tab panel for showing calendar */}
              <TabPanel value={3} sx={{ p: 2 }}>
                <Calendar />
              </TabPanel>
            </Tabs>
          </Sheet>
        ) : (
          // If the user is not logged in, this will show
          <Card>
            <Typography level="h3" component="h3">
              Please Log In
            </Typography>
            <Link to="/login">Login</Link>
          </Card>
        )}
      </Sheet>
    </TeacherContext.Provider>
  );
};

export default TeacherDashboard;
