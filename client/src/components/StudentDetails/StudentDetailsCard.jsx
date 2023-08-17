import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardActions, Grid } from "@mui/joy";
import { StudentContext } from "../../pages/StudentDetails";
import { styles } from "../../styles/studentDetailsStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StudentInfo from "./StudentInfo";
import BadgesPoints from "./BadgesPoints";
import PracticeGraph from "./PracticeGraph";
import SkillSheetCard from "./SkillSheetsCard";
import EditStudent from "./EditStudent";
import PracticePlanContainer from "./PracticePlan/PracticePlanContainer";

// the main information about the student
export default function StudentDetailsCard({ active, setActive }) {
  const { student, id } = useContext(StudentContext);

  // click handler for opening either the Edit Student or Practice Plan cards
  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Link to={`/teacher/${student.teacherId}`}>
          <ArrowBackIosIcon fontSize="large" />
        </Link>

        {/* Student info: Name, instrument, school, etc. */}
        <Grid container flexGrow={1}>
          <Grid xs={12} md={6}>
            <StudentInfo handleClick={handleClick} />
          </Grid>

          {/* Accomplishments like points and badges */}
          <Grid xs={12} md={6}>
            <BadgesPoints />
          </Grid>

          {/* A graph showing days practiced and time practiced */}
          <Grid xs={12} md={6}>
            <PracticeGraph />
          </Grid>

          {/* Showing all skill sheets completed */}
          <Grid xs={12} md={6}>
            <SkillSheetCard />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button component={Link} to={`/student/${id}/practiceHub`}>
          To Practice Hub
        </Button>
        <Button onClick={() => handleClick(2)}>View Practice Plans</Button>
      </CardActions>

      {/* Conditional rendering for button clicks in Card Actions */}
      {active === 1 ? <EditStudent studentId={student._id} /> : null}
      {active === 2 ? <PracticePlanContainer /> : null}
    </Card>
  );
}
