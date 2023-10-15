import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, CardCover, Typography, Box } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StudentInfo from "./StudentInfo";
import BadgesPoints from "./BadgesPoints";
import StudentPiecesContainer from "./Repertoire/StudentPiecesContainer";
import StudentSkillSheetContainer from "./SkillSheets/StudentSkillSheetContainer";
import EditStudent from "./EditStudent";
import PracticePlanContainer from "./PracticePlan/PracticePlanContainer";
import Auth from "../../utils/auth";
import { useStudentContext, useTeacherContext } from "../../utils/Context";
import Clock from "../../utils/Clock";
import RegularModal from "../common/Modal/RegularModal";
import ResourceContainer from "./PracticePlan/Resources/ResourceContainer";

// the main information about the student
export default function StudentDetailsCard({ active, setActive }) {
  const { student } = useStudentContext();
  const { teacher } = useTeacherContext();
  const [resourceArr, setResourceArr] = useState([]);

  // setting the resources from ALL practice plans for the student
  useEffect(() => {
    let newResourceArr = [];
    if (Array.isArray(student.practicePlans)) {
      for (let plan of student.practicePlans) {
        if (plan.resources.length > 0) {
          for (let resource of plan.resources) {
            newResourceArr.push(resource);
          }
        }
      }
    }
    setResourceArr(newResourceArr);
  }, [setResourceArr, student]);

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

          {/* Showing all skill sheets completed */}
          <Grid xs={12} md={12} my={1}>
            <StudentSkillSheetContainer teacher={teacher} />
          </Grid>

          {/* Completed Pieces and Etudes */}
          <Grid xs={12} md={12} my={1}>
            <StudentPiecesContainer />
          </Grid>

          {/* Student Practice Plans */}
          <Grid xs={12} md={12} my={1}>
            <PracticePlanContainer />
          </Grid>
        </Grid>

        {/* Resources specific to the student */}
        <Grid>
          <ResourceContainer resources={resourceArr} />
        </Grid>
      </CardContent>

      {/* <CardActions>
        <Button component={Link} to={`/student/${id}/practiceHub`}>
          To Practice Hub
        </Button>
      </CardActions> */}

      <RegularModal open={active === 1} onRequestClose={() => setActive(null)}>
        <EditStudent studentId={student._id} />
      </RegularModal>
    </Card>
  );
}
