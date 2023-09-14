import React, { useEffect, useState } from "react";
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
import Repertoire from "./Repertoire";
import StudentSkillSheetContainer from "./SkillSheets/StudentSkillSheetContainer";
import EditStudent from "./EditStudent";
import PracticePlanContainer from "./PracticePlan/PracticePlanContainer";
import Auth from "../../utils/auth";
import { QUERY_TEACHER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useStudentContext, useTeacherContext } from "../../utils/Context";
import Clock from "../../utils/Clock";
import RegularModal from "../common/Modal/RegularModal";

// the main information about the student
export default function StudentDetailsCard({ active, setActive }) {
  const { student } = useStudentContext();
  const { teacher, setTeacher } = useTeacherContext();
  const [open, setOpen] = useState(false);

  // This is here so when a student logs in, they are able to get their teacher information to link skillsheets, etc.
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
        {Auth.teacherLoggedIn() && (
          <Link to={`/teacher/${student.teacherId}`}>
            <ArrowBackIosIcon fontSize="large" />
          </Link>
        )}

        {/* Clock */}
        <Box sx={{ textAlign: "center " }}>
          <Clock />
          <Typography level="h4">
            You're Lesson is on <b>{student.lessonDay}</b> at{" "}
            <b>{student.lessonTime}</b>
          </Typography>
        </Box>

        {/* Student info: Name, instrument, school, etc. */}
        <Grid container flexGrow={1}>
          <Grid xs={12} md={6} my={1}>
            <StudentInfo handleClick={handleClick} teacher={teacher} />
          </Grid>

          {/* Accomplishments like points and badges */}
          <Grid xs={12} md={6} my={1}>
            <BadgesPoints
              totalPlanPoints={student.totalPlanPoints}
              totalCompletedPoints={student.totalCompletedPoints}
            />
          </Grid>

          {/* A graph showing days practiced and time practiced */}
          {/* <Grid xs={12} md={6} my={1}>
            <PracticeGraph />
          </Grid>  */}

          {/* Showing all skill sheets completed */}
          <Grid xs={12} md={12} my={1}>
            <StudentSkillSheetContainer teacher={teacher} />
          </Grid>

          {/* Completed Pieces and Etudes */}
          <Grid xs={12} md={6} my={1}>
            <Repertoire />
          </Grid>
          <Grid xs={12} md={12} my={1}>
            <PracticePlanContainer />
          </Grid>
        </Grid>
      </CardContent>

      {/* <CardActions>
        <Button component={Link} to={`/student/${id}/practiceHub`}>
          To Practice Hub
        </Button>
      </CardActions> */}

      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <EditStudent studentId={student._id} />
      </RegularModal>
    </Card>
  );
}
