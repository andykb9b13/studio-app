import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/joy";
import { levelList } from "../common/Assets";
import { badgeList } from "../common/Assets";
import CountUp from "react-countup";
import { useStudentContext } from "../../utils/Context";
import { styles } from "../../styles/studentDetailsStyles";
import ProgressBar from "../common/ProgressBar";
import { BarChart } from "@mui/x-charts/BarChart";

const Badges = ({ badgeIndex, badgeArr }) => {
  console.log(badgeIndex);
  console.log(badgeArr);

  if (badgeIndex !== null) {
    return (
      <img
        src={badgeList[badgeIndex]?.name}
        alt="badge"
        style={{ width: "30%" }}
      />
    );
  } else {
    return;
  }
};

const BadgesPoints = () => {
  const { student } = useStudentContext();
  const [earnedPoints, setEarnedPoints] = useState(0); // Total points from skillSheets and Assignments
  const [progressPercentage, setProgressPercentage] = useState(0); // Percentage to be used in ProgressBar
  const [badgeArr, setBadgeArr] = useState(null);

  useEffect(() => {
    setBadgeArr(student.skillSheets?.map((sheet) => sheet.badgeId));
  }, [setBadgeArr, student]);

  console.log(badgeArr);

  // determine which is the next badge the user can earn. Will be displayed on page.
  const nextBadge = (points) => {
    if (points < 200) {
      return 200;
    } else if (points >= 200 && points < 500) {
      return 500;
    } else if (points >= 500 && points < 1000) {
      return 1000;
    } else if (points >= 1000 && points < 1500) {
      return 1500;
    } else if (points >= 1500 && points < 2000) {
      return 2000;
    } else if (points >= 2000 && points < 3000) {
      return 3000;
    } else if (points >= 3000 && points < 4000) {
      return 4000;
    } else if (points >= 4000 && points < 5000) {
      return 5000;
    }
  };

  // Sets the earnedPoints which is the total of points from completed assignments and skill sheets
  useEffect(() => {
    const totalPoints = student.totalCompletedPoints + student.totalSheetPoints;
    setEarnedPoints(totalPoints);
  }, [student, setEarnedPoints]);

  // set the percentage for the progress bar to be displayed
  useEffect(() => {
    const percentage = Math.floor(
      (earnedPoints / nextBadge(earnedPoints)) * 100
    );
    setProgressPercentage(percentage || 0);
  }, [setProgressPercentage, student, earnedPoints]);

  return (
    <Card sx={styles.card}>
      <Typography level="h2">Progress</Typography>
      <Typography level="h5">
        Total Earned Points: <CountUp end={earnedPoints} />
      </Typography>
      <Typography level="h5">
        Skill Sheets: <CountUp end={student.totalSheetPoints} />
      </Typography>
      <Typography level="h5">
        Assignments: <CountUp end={student.totalCompletedPoints} /> points
      </Typography>
      <Typography level="h5">
        Next Badge: {nextBadge(earnedPoints)} points
      </Typography>
      <ProgressBar
        percentage={progressPercentage}
        width={"150px"}
        height={"150px"}
      />
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        {/* This should be refactored into a single component */}
        {earnedPoints < 200 &&
          "Complete Assignments and Skill Sheets to earn points for badges"}
        {earnedPoints > 200 && (
          <img
            src={levelList[0].name}
            alt="level1 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 500 && (
          <img
            src={levelList[1].name}
            alt="level2 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 1000 && (
          <img
            src={levelList[2].name}
            alt="level3 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 1500 && (
          <img
            src={levelList[3].name}
            alt="level4 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 2000 && (
          <img
            src={levelList[4].name}
            alt="level5 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 3000 && (
          <img
            src={levelList[5].name}
            alt="level6 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 4000 && (
          <img
            src={levelList[6].name}
            alt="level7 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 5000 && (
          <img
            src={levelList[7].name}
            alt="level8 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 6000 && (
          <img
            src={levelList[8].name}
            alt="level9 badge"
            style={{ width: "30%" }}
          />
        )}
        {earnedPoints > 7000 && (
          <img
            src={levelList[9].name}
            alt="level10 badge"
            style={{ width: "30%" }}
          />
        )}
        {badgeArr?.map((badgeIndex) => (
          <Badges badgeIndex={badgeIndex} badgeArr={badgeArr} />
        ))}
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
            data: [student.totalSheetPoints, student.totalCompletedPoints, 500],
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
