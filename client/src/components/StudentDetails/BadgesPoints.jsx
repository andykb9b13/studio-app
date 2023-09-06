import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/joy";
import { levelList } from "../common/Assets";
import CountUp from "react-countup";
import { useStudentContext } from "../../utils/Context";
import { styles } from "../../styles/studentDetailsStyles";
import ProgressBar from "../common/ProgressBar";
import { BarChart } from "@mui/x-charts/BarChart";

const BadgesPoints = () => {
  const { student } = useStudentContext();

  const [progressPercentage, setProgressPercentage] = useState(0);

  // determine which is the next badge
  const nextBadge = (points) => {
    if (points < 200) {
      return "200";
    } else if (points >= 200 && points < 500) {
      return "500";
    } else if (points >= 500 && points < 1000) {
      return "1000";
    } else if (points >= 1000 && points < 1500) {
      return "1500";
    } else if (points >= 1500 && points < 2000) {
      return "2000";
    } else if (points >= 2000 && points < 3000) {
      return "3000";
    } else if (points >= 3000 && points < 4000) {
      return "4000";
    } else if (points >= 4000 && points < 5000) {
      return "5000";
    }
  };

  // set the percentage for the progress bar
  useEffect(() => {
    const percentage = Math.floor(
      (student.totalCompletedPoints / nextBadge(student.totalCompletedPoints)) *
        100
    );
    setProgressPercentage(percentage);
  }, [setProgressPercentage, student]);

  return (
    <Card sx={styles.card}>
      <Typography level="h2">Progress</Typography>

      <Typography level="h5">Skill Sheets:</Typography>
      <Typography level="h5">
        Assignments: <CountUp end={student.totalCompletedPoints} /> points
      </Typography>
      <Typography level="h5">
        Next Badge: {nextBadge(student.totalCompletedPoints)} points
      </Typography>
      <ProgressBar
        percentage={progressPercentage}
        width={"150px"}
        height={"150px"}
      />
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        {student.totalCompletedPoints < 200 &&
          "Complete Assignments and Skill Sheets to earn points for badges"}
        {student.totalCompletedPoints > 200 && (
          <img
            src={levelList[0].name}
            alt="level1 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 500 && (
          <img
            src={levelList[1].name}
            alt="level2 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 1000 && (
          <img
            src={levelList[2].name}
            alt="level3 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 1500 && (
          <img
            src={levelList[3].name}
            alt="level4 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 2000 && (
          <img
            src={levelList[4].name}
            alt="level5 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 3000 && (
          <img
            src={levelList[5].name}
            alt="level6 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 4000 && (
          <img
            src={levelList[6].name}
            alt="level7 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 5000 && (
          <img
            src={levelList[7].name}
            alt="level8 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 6000 && (
          <img
            src={levelList[8].name}
            alt="level9 badge"
            style={{ width: "50%" }}
          />
        )}
        {student.totalCompletedPoints > 7000 && (
          <img
            src={levelList[9].name}
            alt="level10 badge"
            style={{ width: "50%" }}
          />
        )}
      </Box>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["SkillSheets", "Plans", "Studio Avg."],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [20, student.totalCompletedPoints, 3],
          },
        ]}
        width={325}
        height={400}
        colors={["#662e9b"]}
      />
    </Card>
  );
};

export default BadgesPoints;
