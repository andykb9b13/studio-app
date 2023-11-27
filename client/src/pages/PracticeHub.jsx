import React, { useState } from "react";
import {
  IconButton,
  Card,
  CardContent,
  Grid,
  Sheet,
  Typography,
  Box,
} from "@mui/joy";
import TimedPractice from "../components/PracticeHub/TimedPractice";
import StreakPractice from "../components/PracticeHub/StreakPractice";
import SkillSheets from "../components/TeacherDashboard/SkillSheets/SkillSheetContainer";
import Auth from "../utils/auth";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { styles } from "../styles/studentDetailsStyles";
import { useStudentContext } from "../utils/Context";
import mountainBkgd from "../assets/mountainBkgd.png";
import response22 from "../assets/streak/response22.png";
import timer from "../assets/timer.png";
import badge12 from "../assets/badges/badge12.png";

const PracticeHub = () => {
  const [status, setStatus] = useState("home");
  const { student } = useStudentContext();
  const home = status === "home";
  const timedPractice = status === "timedPractice";
  const streakPractice = status === "streakPractice";
  const skillSheets = status === "skillSheets";

  // Button information for the practice hub to be mapped over to create the different components
  const buttonInfo = [
    {
      label: "Timed Practice",
      description: "Set a timer for yourself",
      image: timer,
      id: "timedPractice",
    },
    {
      label: "Streak Practice",
      description: "Get on a winning streak!",
      image: response22,
      id: "streakPractice",
    },
    {
      label: "Skill Sheets",
      description: "View your skill sheets",
      image: badge12,
      id: "skillSheets",
    },
  ];

  const handleClick = (name) => {
    console.log(name);
    setStatus(name);
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Sheet
          id="mainPracticeHubContainer"
          sx={{
            backgroundImage: `url(${mountainBkgd})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Typography level="h1" textAlign="center">
            Practice Hub
          </Typography>

          {!home && <KeyboardArrowLeftIcon onClick={() => setStatus("home")} />}
          {home && (
            <Grid
              id="practiceHubGrid"
              container
              sx={{ flexGrow: 1, justifyContent: "center" }}
            >
              {/* Mapping button information to create different components for each practiceHub area */}
              {buttonInfo.map((button) => (
                <Grid
                  className="practiceHubAppsContainer"
                  key={button.id}
                  xs={10}
                  s={6}
                  md={4}
                  lg={3}
                  m={1}
                >
                  <Card className="practiceHubAppCard" sx={styles.card}>
                    <Box
                      sx={{ backgroundColor: "white", borderRadius: "10px" }}
                    >
                      <Typography
                        level="h2"
                        sx={{ mb: 0.5 }}
                        textAlign="center"
                      >
                        {button.label}
                      </Typography>
                    </Box>
                    <CardContent orientation="vertical">
                      <Box display="flex" justifyContent="center">
                        <img
                          src={button.image}
                          alt="streak icon"
                          style={{ maxWidth: "50%" }}
                        />
                      </Box>
                      <Typography
                        level="body1"
                        endDecorator={
                          <IconButton>
                            <KeyboardArrowRightIcon
                              key={button.id}
                              onClick={() => {
                                handleClick(button.id);
                              }}
                            />
                          </IconButton>
                        }
                      >
                        {button.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {timedPractice && <TimedPractice student={student} />}
          {streakPractice && <StreakPractice student={student} />}
          {skillSheets && <SkillSheets student={student} />}
        </Sheet>
      ) : (
        <Sheet>Please Login</Sheet>
      )}
    </>
  );
};

export default PracticeHub;
