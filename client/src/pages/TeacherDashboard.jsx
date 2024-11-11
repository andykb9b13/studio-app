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
import RegularModal from "../components/common/Modal/RegularModal";
import DeleteModalContent from "../components/common/Modal/DeleteModalContent";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import ChecklistIcon from "@mui/icons-material/Checklist";
import HandymanIcon from "@mui/icons-material/Handyman";
import TeacherResourceContainer from "../components/TeacherDashboard/Resources/TeacherResourceContainer";
import Leaderboard from "../components/StudentDetails/Leaderboard";
import MessageIcon from "@mui/icons-material/Message";
import MessageBoard from "../components/MessageBoard/MessageBoardContainer";
import { useTeacherContext } from "../utils/Context";
import TeacherProfile from "../components/TeacherDashboard/TeacherProfile/TeacherProfile";
import PleaseLogin from "../components/common/PleaseLogin";

// Top level component for the teacher dashboard. This component is rendered when the user is logged in as a teacher.
const TeacherDashboard = () => {
  const { teacher, setTeacher } = useTeacherContext(); // getting the teacher info from the context
  const { id } = useParams(); // getting the teacher info using the id from the URL parameters
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });

  // Setting the teacher info to be displayed initially
  useEffect(() => {
    setTeacher(data?.teacher || {});
  }, [setTeacher, data]);

  const { isMobile } = useContext(MobileContext); // checking if the screen size is mobile
  const [deleteTeacher] = useMutation(DELETE_TEACHER); // mutation for deleting a teacher
  const [students, setStudents] = useState(data?.teacher.students || []); // handler for the students
  const [clicked, setClicked] = useState(false); // handler for the tabs
  const [open, setOpen] = useState(false); // handler for the modal
  const [resources, setResources] = useState(teacher.resources); // handler for the resources

  // Handles the panel viewing
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  // Setting the students to be displayed initially
  useEffect(() => {
    setStudents(teacher?.students);
  }, [teacher?.students]);

  // Setting the resources to be displayed initially
  useEffect(() => {
    setResources(data?.teacher.resources);
  }, [setResources, data]);

  // Handles the deletion of the teacher account
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
    <Sheet
      id="mainTeacherDashboardContainer"
      sx={{ background: "transparent" }}
    >
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
              <Tab id="studentDatabaseTab">
                <StorageIcon />
                {!isMobile && (
                  <Typography>
                    <b>Student Database</b>
                  </Typography>
                )}
              </Tab>
              <Tab id="messageBoardTab">
                <MessageIcon />
                {!isMobile && (
                  <Typography>
                    <b>Message Board</b>
                  </Typography>
                )}
              </Tab>
              <Tab id="teacherProfileTab">
                <PersonIcon />
                {!isMobile && (
                  <Typography>
                    <b>Profile</b>
                  </Typography>
                )}
              </Tab>
              <Tab id="teacherSkillSheetsTab">
                <ChecklistIcon />
                {!isMobile && (
                  <Typography>
                    <b>SkillSheets</b>
                  </Typography>
                )}
              </Tab>
              <Tab id="teacherResourcesTab">
                <HandymanIcon />
                {!isMobile && (
                  <Typography>
                    <b>Resources</b>
                  </Typography>
                )}
              </Tab>
            </TabList>

            {/* Panel for student database view (includes student search) */}
            <TabPanel
              id="studentDatabaseTabPanel"
              value={0}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Button toggles clicked to open and close CreateStudent */}
              <Button
                id="addStudentBtn"
                onClick={() => {
                  handleClick();
                }}
                sx={{ my: 2 }}
                variant="soft"
                color="success"
              >
                {clicked ? "Cancel" : "Add Student"}
              </Button>

              {/* Opens form to create a new student when clicked is true */}
              {clicked ? <CreateStudent teacherId={id} /> : ""}

              {/* Displays list of students */}
              <StudentDatabaseTable
                students={students}
                setStudents={setStudents}
              />

              {/* Displays students in order of their points */}
              <Leaderboard />

              {/* Modal for deleting teacher account */}
              <RegularModal open={open} onRequestClose={() => setOpen(false)}>
                <DeleteModalContent
                  onRequestClose={() => setOpen(false)}
                  confirmAction={() => deleteTeacherFunc()}
                  resourceName="teacher"
                />
              </RegularModal>
              <Button
                id="deleteTeacherBtn"
                onClick={() => setOpen(true)}
                color="danger"
                style={{ marginTop: "20px" }}
              >
                Delete Teacher Account
              </Button>
            </TabPanel>

            {/* Tab panel for Message Board */}
            <TabPanel id="messageBoardTabPanel" value={1} sx={{ p: 2 }}>
              <MessageBoard />
            </TabPanel>

            {/* Tab panel for Viewing profile information */}
            <TabPanel id="teacherProfileTabPanel" value={2} sx={{ p: 2 }}>
              <TeacherProfile />
            </TabPanel>

            {/* Tab panel for Skill sheets */}
            <TabPanel id="teacherSkillSheetTabPanel" value={3} sx={{ p: 2 }}>
              <SkillSheetContainer />
            </TabPanel>

            {/* Tab panel for Resources */}
            <TabPanel id="teacherResourceTabPanel" value={4} sx={{ p: 2 }}>
              <TeacherResourceContainer
                resources={resources}
                setResources={setResources}
              />
            </TabPanel>
          </Tabs>
        </Sheet>
      ) : (
        // If the user is not logged in, this will show

        <PleaseLogin />
      )}
    </Sheet>
  );
};

export default TeacherDashboard;
