import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  CardCover,
  Typography,
  Box,
} from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StudentInfo from "./StudentInfo";
import BadgesPoints from "./BadgesPoints";
import PracticeGraph from "./PracticeGraph";
import SkillSheetCard from "./SkillSheetCard";
import EditStudent from "./EditStudent";
import PracticePlanContainer from "./PracticePlan/PracticePlanContainer";
import Auth from "../../utils/auth";
import { QUERY_TEACHER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useStudentContext, useTeacherContext } from "../../utils/Context";
import Clock from "../../utils/Clock";

// the main information about the student
export default function StudentDetailsCard({ active, setActive }) {
  const { student } = useStudentContext();
  const { teacher, setTeacher } = useTeacherContext();
  const id = student._id;
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: student.teacherId,
    },
  });

  useEffect(() => {
    setTeacher(data?.teacher || {});
  }, [data, setTeacher]);

  // click handler for opening either the Edit Student or Practice Plan cards
  const handleClick = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <Card sx={styles.container}>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 800px), linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 800px)",
        }}
      />
      <CardContent>
        <Box sx={{ textAlign: "center " }}>
          <Clock />
          <Typography level="h4">
            You're Lesson is on <b>{student.lessonDay}</b> at{" "}
            <b>{student.lessonTime}</b>
          </Typography>
        </Box>

        {Auth.teacherLoggedIn() && (
          <Link to={`/teacher/${student.teacherId}`}>
            <ArrowBackIosIcon fontSize="large" />
          </Link>
        )}

        {/* Student info: Name, instrument, school, etc. */}
        <Grid container flexGrow={1}>
          <Grid xs={12} md={6}>
            <StudentInfo handleClick={handleClick} teacher={teacher} />
          </Grid>

          {/* Accomplishments like points and badges */}
          <Grid xs={12} md={6}>
            <BadgesPoints
              totalPlanPoints={student.totalPlanPoints}
              totalCompletedPoints={student.totalCompletedPoints}
            />
          </Grid>

          {/* A graph showing days practiced and time practiced */}
          <Grid xs={12} md={6}>
            <PracticeGraph />
          </Grid>

          {/* Showing all skill sheets completed */}
          <Grid xs={12} md={6}>
            <SkillSheetCard teacher={teacher} />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/student/${id}/practiceHub`}>
          To Practice Hub
        </Button>
        <Button onClick={() => handleClick(2)}>
          {active === 2 ? "Close" : "View Practice Plans"}
        </Button>
      </CardActions>

      {/* Conditional rendering for button clicks in Card Actions */}
      {active === 1 ? <EditStudent studentId={student._id} /> : null}
      {active === 2 ? <PracticePlanContainer /> : null}
    </Card>
  );
}
