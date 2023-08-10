import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import EditStudent from "./EditStudent";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Table,
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StudentContext } from "../../pages/StudentDetails";
import PracticePlanCard from "./PracticePlan/PracticePlanCard";
import { styles } from "../../styles/studentDetailsStyles";
import avatar1 from "../../assets/avatars/avatar1.png";
import level1 from "../../assets/badges/level1.png";
import level2 from "../../assets/badges/level2.png";
import sampleGraph from "../../assets/sampleGraph.png";
import goGetter from "../../assets/badges/goGetter.png";
import climbingHigh from "../../assets/badges/climbingHigh.png";

// the main information about the student
export default function StudentDetailsCard() {
  const { student, id } = useContext(StudentContext);
  const [active, setActive] = useState(0);

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

        <Grid container flexGrow={1}>
          <Grid xs={12} md={6}>
            <Box paddingLeft={4}>
              <Typography
                level="h2"
                component="h2"
                endDecorator={<EditIcon onClick={() => handleClick(1)} />}
              >
                {student.firstName} {student.lastName}
              </Typography>
              <Typography>
                <b>Email:</b> {student.email}
              </Typography>
              <Typography>
                <b>Primary Contact:</b> {student.primaryContact}
              </Typography>
              <Typography>
                <b>Primary Contact Email:</b> {student.primaryContactEmail}
              </Typography>
              <Typography>
                <b>Instrument:</b> {student.instrument}
              </Typography>
              <Typography>
                <b>Lesson Day:</b> {student.lessonDay}
              </Typography>
              <Typography>
                <b>Lesson Time:</b> {student.lessonTime}
              </Typography>
              <Typography>
                <b>Grade:</b> {student.grade}
              </Typography>
              <Typography>
                <b>School:</b> {student.school}
              </Typography>
              <Typography>
                <b>Lesson Location:</b> {student.lessonLocation}
              </Typography>
              <Typography>
                <b>Is Active:</b> {student.isActive}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <img
                src={avatar1}
                alt="avatar"
                style={{
                  borderRadius: "50%",
                  width: "35%",
                  marginInline: "auto",
                }}
              />
              <Typography level="h3">Points: 450</Typography>
              <Typography level="h3">Badges: </Typography>
              <Box variant="solid">
                <img src={level1} alt="level1 badge" style={{ width: "25%" }} />
                <img src={level2} alt="level2 badge" style={{ width: "25%" }} />
              </Box>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card>
              <Typography level="h3">Practice Hours / Week</Typography>
              <img
                src={sampleGraph}
                alt="sample graph of progress"
                style={{ width: "100%", marginInline: "auto" }}
              />
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <Typography level="h2">Skill Sheets</Typography>
              <Table
                aria-label="basic table"
                stickyHeader
                sx={{
                  borderRadius: "4px",
                  boxShadow: "lg",
                  p: 2,
                  backgroundColor: "rgb(102, 46, 155, 0.2)",
                }}
              >
                <thead>
                  <tr>
                    <th>Sheet Name</th>
                    <th>Badge</th>
                    <th>Points</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gettin Started</td>
                    <td>
                      <img src={goGetter} alt="" width={"60%"} />
                    </td>
                    <td>50</td>
                    <td>Beginner</td>
                  </tr>
                  <tr>
                    <td>Movin On</td>
                    <td>
                      <img src={climbingHigh} alt="" width={"60%"} />
                    </td>
                    <td>75</td>
                    <td>Beginner</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
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
      {active === 1 ? <EditStudent studentId={student._id} /> : ""}
      {active === 2 ? <PracticePlanCard /> : ""}
    </Card>
  );
}
