import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import { Sheet, Typography, Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import StudentDetailsCard from "../components/StudentDetails/StudentDetailsCard";
import Auth from "../utils/auth";
import { useStudentContext } from "../utils/Context";
import { MobileContext } from "../App";
import Leaderboard from "../components/StudentDetails/Leaderboard";
import VirtualTutor from "./VirtualTutor";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import StudentPointsChart from "../components/StudentDetails/StudentPointsChart";
import HubIcon from "@mui/icons-material/Hub";
import PracticeHub from "./PracticeHub";

// Top component in the tree for students. Provider is passing student info through context.
export default function StudentDetails() {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  // query for finding individual student information
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const { student, setStudent } = useStudentContext();
  const { isMobile } = useContext(MobileContext);

  console.log(student);

  useEffect(() => {
    setStudent(data?.student || {});
  }, [setStudent, data]);

  return (
    <>
      {Auth.loggedIn() ? (
        <Sheet>
          <Tabs
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
            <TabPanel value={0}>
              <StudentDetailsCard active={active} setActive={setActive} />
            </TabPanel>
            <TabPanel value={1}>
              <StudentPointsChart />
              <Leaderboard />
            </TabPanel>
            <TabPanel value={2}>
              <VirtualTutor />
            </TabPanel>
            <TabPanel value={3}>
              <PracticeHub />
            </TabPanel>
          </Tabs>
        </Sheet>
      ) : (
        <Sheet>
          <Typography>Please Login </Typography>
        </Sheet>
      )}
    </>
  );
}
