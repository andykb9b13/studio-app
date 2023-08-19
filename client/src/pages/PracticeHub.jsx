import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Grid,
  Sheet,
  Typography,
} from "@mui/joy";
import TimedPractice from "../components/PracticeHub/TimedPractice";
import StreakPractice from "../components/PracticeHub/StreakPractice";
import SkillSheets from "../components/TeacherDashboard/SkillSheets/SkillSheetContainer";
import CreateAssignment from "../components/StudentDetails/PracticePlan/Assignments/CreateAssignment";
import VirtualTutor from "./VirtualTutor";
import PracticePlanCard from "../components/StudentDetails/PracticePlan/PracticePlanCard";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArticleIcon from "@mui/icons-material/Article";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InsightsIcon from "@mui/icons-material/Insights";
import LinkIcon from "@mui/icons-material/Link";
import AddchartIcon from "@mui/icons-material/Addchart";
import QuizIcon from "@mui/icons-material/Quiz";
import Auth from "../utils/auth";

const PracticeHub = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("home");

  const { loading, error, data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const [student, setStudent] = useState(null);

  console.log(student);

  useEffect(() => {
    if (data) {
      setStudent(data.student);
    }
    if (loading) {
      console.log("loading!!!");
    }
    if (error) {
      console.log("Error", error);
    }
  }, [data, error, loading]);

  const home = status === "home";
  const timedPractice = status === "timedPractice";
  const streakPractice = status === "streakPractice";
  const skillSheets = status === "skillSheets";
  const createAssignment = status === "createAssignment";
  const progress = status === "progress";
  const resources = status === "resources";
  const practicePlan = status === "practicePlan";
  const tutor = status === "tutor";

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
    {
      label: "Create Assignment",
      description: "Make an assignment",
      image: <EditNoteIcon />,
      id: "createAssignment",
    },
    {
      label: "Track Your Progress",
      description: "See how far you've come!",
      image: <InsightsIcon />,
      id: "progress",
    },
    {
      label: "Resources",
      description: "Check out some external resources",
      image: <LinkIcon />,
      id: "resources",
    },
    {
      label: "View Practice Plans",
      description: "View all past and present assignments",
      image: <AddchartIcon />,
      id: "practicePlan",
    },
    {
      label: "TroubleShooting",
      description:
        "Having trouble and not sure where to start? Try the virtual tutor.",
      image: <QuizIcon />,
      id: "troubleshooting",
    },
  ];

  const handleClick = (name) => {
    console.log(name);
    setStatus(name);
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Sheet>
          <Typography level="h1">Practice Hub</Typography>
          <Link to={`/teacher/studentDetails/${id}`}>
            <Button> Back to Student Details</Button>
          </Link>
          {!home && (
            <Button onClick={() => setStatus("home")}>
              Back to Practice Hub
            </Button>
          )}
          {home && (
            <Grid container sx={{ flexGrow: 1, justifyContent: "center" }}>
              {buttonInfo.map((button) => (
                <Grid xs={10} s={6} md={4} lg={3} m={1}>
                  <Card variant="outlined">
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
                      <Button
                        key={button.id}
                        onClick={() => {
                          handleClick(button.id);
                        }}
                      >
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* I need to wrap all of this in the Student Provider so it can have access to the id */}

          {/* Here I've just hardcoded the student id to be passed as a prop but 
        the problem is I will have to drill it down pretty far if necessary. 
        I need to use context.  */}
          {timedPractice && <TimedPractice student={student} />}
          {streakPractice && <StreakPractice student={student} />}
          {skillSheets && <SkillSheets student={student} />}
          {createAssignment && <CreateAssignment student={student} />}
          {practicePlan && (
            <PracticePlanCard
              student={student}
              studentId={student._id}
              practicePlans={student.practicePlans}
            />
          )}
          {tutor && <VirtualTutor student={student} />}
        </Sheet>
      ) : (
        <Sheet>Please Login</Sheet>
      )}
    </>
  );
};

export default PracticeHub;
