import React, { useContext, useEffect, useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HandymanIcon from "@mui/icons-material/Handyman";
import TeacherResourceContainer from "../components/TeacherDashboard/Resources/TeacherResourceContainer";
import CreateTeacherResourceContainer from "../components/TeacherDashboard/Resources/CreateTeacherResourceContainer";
import Leaderboard from "../components/StudentDetails/Leaderboard";
import MessageIcon from "@mui/icons-material/Message";
import MessageBoard from "../components/MessageBoard/MessageBoardContainer";
import { useTeacherContext } from "../utils/Context";
import TeacherProfile from "../components/TeacherDashboard/TeacherProfile/TeacherProfile";

// export const TeacherContext = createContext();

const TeacherDashboard = () => {
  const { teacher, setTeacher } = useTeacherContext();
  // getting the teacher info using the id from the URL parameters
  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  useEffect(() => {
    setTeacher(data?.teacher || {});
  }, [setTeacher, data]);

  const { isMobile } = useContext(MobileContext); // checking if the screen size is mobile
  const [deleteTeacher, { error }] = useMutation(DELETE_TEACHER);
  const [students, setStudents] = useState(data?.teacher.students || []);
  const [clicked, setClicked] = useState(false); // handler for the tabs
  const [open, setOpen] = useState(false); // handler for the modal
  const [resources, setResources] = useState(teacher.resources);

  // Handles the panel viewing
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  // Setting the students to be displayed initially
  useEffect(() => {
    setStudents(teacher.students);
  }, [teacher.students]);

  // Setting the resources to be displayed initially
  useEffect(() => {
    setResources(data?.teacher.resources);
  }, [setResources, data]);

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
    <Sheet>
      {Auth.loggedIn() ? (
        <Sheet>
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
                <StorageIcon />
                {!isMobile && (
                  <Typography>
                    <b>Student Database</b>
                  </Typography>
                )}
              </Tab>
              <Tab>
                <MessageIcon />
                {!isMobile && (
                  <Typography>
                    <b>Message Board</b>
                  </Typography>
                )}
              </Tab>
              <Tab>
                <PersonIcon />
                {!isMobile && (
                  <Typography>
                    <b>Profile</b>
                  </Typography>
                )}
              </Tab>
              <Tab>
                <ChecklistIcon />
                {!isMobile && (
                  <Typography>
                    <b>SkillSheets</b>
                  </Typography>
                )}
              </Tab>
              <Tab>
                <HandymanIcon />
                {!isMobile && (
                  <Typography>
                    <b>Resources</b>
                  </Typography>
                )}
              </Tab>
              <Tab>
                <CalendarMonthIcon />
                {!isMobile && (
                  <Typography>
                    <b>View Calendar</b>
                  </Typography>
                )}
              </Tab>
            </TabList>

            {/* Panel for student database view (includes student search) */}
            <TabPanel
              value={0}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
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
              <Leaderboard />
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

            <TabPanel value={1} sx={{ p: 2 }}>
              <MessageBoard />
            </TabPanel>

            {/* Tab panel for Viewing profile information */}
            <TabPanel value={2} sx={{ p: 2 }}>
              <TeacherProfile />
            </TabPanel>

            {/* Tab panel for Skill sheets */}
            <TabPanel value={3} sx={{ p: 2 }}>
              <SkillSheetContainer />
            </TabPanel>

            <TabPanel value={4} sx={{ p: 2 }}>
              <TeacherResourceContainer
                resources={resources}
                setResources={setResources}
              />
            </TabPanel>

            {/* Tab panel for showing calendar */}
            <TabPanel value={5} sx={{ p: 2 }}>
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
    // </TeacherContext.Provider>
  );
};

export default TeacherDashboard;
