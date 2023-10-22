import React, { useState } from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  Grid,
  Sheet,
  Typography,
} from "@mui/joy";
import TimedPractice from "../components/PracticeHub/TimedPractice";
import StreakPractice from "../components/PracticeHub/StreakPractice";
import SkillSheets from "../components/TeacherDashboard/SkillSheets/SkillSheetContainer";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArticleIcon from "@mui/icons-material/Article";
import Auth from "../utils/auth";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { styles } from "../styles/studentDetailsStyles";
import { useStudentContext } from "../utils/Context";

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
      image: <TimerIcon />,
      id: "timedPractice",
    },
    {
      label: "Streak Practice",
      description: "Get on a winning streak!",
      image: <CheckCircleIcon />,
      id: "streakPractice",
    },
    {
      label: "Skill Sheets",
      description: "View your skill sheets",
      image: <ArticleIcon />,
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
        <Sheet id="mainPracticeHubContainer">
          <Typography level="h1">Practice Hub</Typography>

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
                  <Card clasName="practiceHubAppCard" sx={styles.card}>
                    <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
                      {button.label}
                    </Typography>
                    <AspectRatio minHeight="120px" maxHeight="200px">
                      {button.image}
                    </AspectRatio>
                    <CardContent orientation="horizontal">
                      <Typography level="body1">
                        {button.description}
                      </Typography>
                      <KeyboardArrowRightIcon
                        key={button.id}
                        onClick={() => {
                          handleClick(button.id);
                        }}
                      />
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
