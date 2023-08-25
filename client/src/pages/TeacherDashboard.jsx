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
  const { isMobile } = useContext(MobileContext); // checking if the screen size is mobile
  const [deleteTeacher, { error }] = useMutation(DELETE_TEACHER);
  const [students, setStudents] = useState(data?.teacher.students || []);
  const [clicked, setClicked] = useState(false); // handler for the tabs
  const [open, setOpen] = useState(false); // handler for the modal

  const teacher = data?.teacher || [];

  // Handles the panel viewing
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  // Setting the students to be displayed initially
  useEffect(() => {
    setStudents(teacher.students);
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
        {Auth.loggedIn() ? (
          <Sheet sx={{ mt: 2 }}>
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
                <StudentSearch students={students} setStudents={setStudents} />
                <Button
                  onClick={() => {
                    handleClick();
                  }}
                  sx={{ my: 2 }}
                  variant="soft"
                  color="success"
                >
                  {clicked ? "Cancel" : "Add Student"}
                </Button>

                {clicked ? <CreateStudent teacherId={id} /> : ""}
                <StudentDatabaseTable
                  students={students}
                  setStudents={setStudents}
                />
                <RegularModal open={open} onRequestClose={() => setOpen(false)}>
                  <DeleteModalContent
                    onRequestClose={() => setOpen(false)}
                    confirmAction={() => deleteTeacherFunc()}
                    resourceName="teacher"
                  />
                </RegularModal>
                <Button onClick={() => setOpen(true)} color="danger">
                  Delete Teacher Account
                </Button>
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
