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

// Parent Component for all the Student Details
export default function StudentDetailsCard({ active, setActive }) {
  const { student } = useStudentContext(); // get student from context
  const { teacher } = useTeacherContext(); // get teacher from context
  const [resourceArr, setResourceArr] = useState([]); // array of resources for the student

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
    <Card id="studentDetailsCard" sx={styles.container}>
      <CardCover sx={styles.studentDetailsCardCover} />

      {/* If the teacher is viewing the studentDetailsCard, they can navigate back to the teacherDashboard */}
      <CardContent>
        {Auth.teacherLoggedIn() && (
          <Link to={`/teacher/${student.teacherId}`}>
            <ArrowBackIosIcon fontSize="large" />
          </Link>
        )}

        {/* Clock */}
        <Box id="clockContainer" sx={{ textAlign: "center " }}>
          <Clock />
          <Typography level="h4">
            Your Lesson is on <b>{student.lessonDay}</b> at{" "}
            <b>{student.lessonTime}</b>
          </Typography>
        </Box>

        {/* Student info: Name, instrument, school, etc. */}
        <Grid container flexGrow={1}>
          <Grid id="studentInfoGrid" xs={12} md={6} my={1}>
            <StudentInfo handleClick={handleClick} teacher={teacher} />
          </Grid>

          {/* Accomplishments like points and badges */}
          <Grid id="badgesPointsGrid" xs={12} md={6} my={1}>
            <BadgesPoints
              totalPlanPoints={student.totalPlanPoints}
              totalCompletedPoints={student.totalCompletedPoints}
            />
          </Grid>

          {/* Showing all skill sheets completed */}
          <Grid id="studentSkillSheetGrid" xs={12} md={12} my={1}>
            <StudentSkillSheetContainer teacher={teacher} />
          </Grid>

          {/* Completed Pieces and Etudes */}
          <Grid id="studentPiecesContainerGrid" xs={12} md={12} my={1}>
            <StudentPiecesContainer
              student={student}
              teacher={teacher}
              pieces={student.pieces}
            />
          </Grid>

          {/* Student Practice Plans */}
          <Grid id="practicePlanContainerGrid" xs={12} md={12} my={1}>
            <PracticePlanContainer />
          </Grid>
        </Grid>

        {/* Resources specific to the student */}
        <Grid id="resourceContainerGrid">
          <ResourceContainer resources={resourceArr} />
        </Grid>
      </CardContent>

      {/* Modal for editing the student */}
      <RegularModal
        open={active === 1}
        onRequestClose={() => setActive(null)}
        style={{ width: "1000px" }}
      >
        <EditStudent studentId={student._id} setActive={setActive} />
      </RegularModal>
    </Card>
  );
}
