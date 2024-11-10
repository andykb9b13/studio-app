import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT, QUERY_TEACHER } from "../utils/queries";
import { Sheet, Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import StudentDetailsCard from "../components/StudentDetails/StudentDetailsCard";
import Auth from "../utils/auth";
import { useStudentContext, useTeacherContext } from "../utils/Context";
import { MobileContext } from "../App";
import Leaderboard from "../components/StudentDetails/Leaderboard";
import VirtualTutor from "./VirtualTutor";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import StudentPointsChart from "../components/StudentDetails/StudentPointsChart";
import HubIcon from "@mui/icons-material/Hub";
import MessageIcon from "@mui/icons-material/Message";
import PracticeHub from "./PracticeHub";
import MessageBoard from "../components/MessageBoard/MessageBoardContainer";
import PleaseLogin from "../components/common/PleaseLogin";

// Top component in the tree for students. This is the main entry point for students.
export default function StudentDetails() {
  const [active, setActive] = useState(0);
  const { teacher, setTeacher } = useTeacherContext();
  const { id } = useParams();
  // query for finding individual student information
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const { student, setStudent } = useStudentContext();
  const { isMobile } = useContext(MobileContext);

  // This is here so when a student logs in, they are able to get their teacher information to link skillsheets, etc.
  const activeTeacher = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: student.teacherId,
    },
  });

  useEffect(() => {
    setStudent(data?.student || {});
  }, [setStudent, data]);

  // Setting the teacher
  useEffect(() => {
    setTeacher(activeTeacher.data?.teacher || {});
  }, [activeTeacher, setTeacher]);

  return (
    <>
      {Auth.loggedIn() ? (
        <Sheet id="mainStudentDetailsContainer">
          <Tabs
            id="studentDetailsTabs"
            aria-label="Basic tabs"
            defaultValue={0}
            sx={{ borderRadius: "lg" }}
            variant="scrollable"
            scrollbuttons="auto"
          >
            <TabList color="primary">
              <Tab>
                <PersonIcon />
                {!isMobile && <b>Overview</b>}
              </Tab>
              <Tab>
                <MessageIcon />
                {!isMobile && <b>Message Board</b>}
              </Tab>
              <Tab>
                <TrendingUpIcon />
                {!isMobile && <b>Leaderboard</b>}
              </Tab>
              <Tab>
                <HelpCenterIcon />
                {!isMobile && <b>Virtual Tutor</b>}
              </Tab>
              <Tab>
                <HubIcon />
                {!isMobile && <b>Practice Hub</b>}
              </Tab>
            </TabList>
            {/* Main student details section  */}
            <TabPanel className="studentTabPanel" value={0}>
              <StudentDetailsCard active={active} setActive={setActive} />
            </TabPanel>
            {/* Message board for the studio */}
            <TabPanel className="studentTabPanel" value={1}>
              <MessageBoard />
            </TabPanel>
            {/* Section for viewing student points across the studio and personalized points breakdown */}
            <TabPanel className="studentTabPanel" value={2}>
              <Leaderboard />
              <StudentPointsChart />
            </TabPanel>
            {/* Section for accessing the Virtual Tutor*/}
            <TabPanel className="studentTabPanel" value={3}>
              <VirtualTutor />
            </TabPanel>
            {/* Section for accessing the Practice Hub */}
            <TabPanel className="studentTabPanel" value={4}>
              <PracticeHub />
            </TabPanel>
          </Tabs>
        </Sheet>
      ) : (
        <PleaseLogin />
      )}
    </>
  );
}
