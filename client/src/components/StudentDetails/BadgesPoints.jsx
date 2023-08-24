import React from "react";
import { Card, Typography, Box } from "@mui/joy";
import avatar1 from "../../assets/avatars/avatar1.png";
import level1 from "../../assets/badges/level1.png";
import level2 from "../../assets/badges/level2.png";
import level3 from "../../assets/badges/level3.png";
import level4 from "../../assets/badges/level4.png";

const BadgesPoints = ({ totalPlanPoints, totalCompletedPoints }) => {
  return (
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
      <Typography level="h3">Plan Points: {totalPlanPoints}</Typography>
      <Typography level="h3">
        Completed Points: {totalCompletedPoints}
      </Typography>
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        {totalCompletedPoints > 200 && (
          <img src={level1} alt="level1 badge" style={{ width: "25%" }} />
        )}
        {totalCompletedPoints > 500 && (
          <img src={level2} alt="level2 badge" style={{ width: "25%" }} />
        )}
        {totalCompletedPoints > 1000 && (
          <img src={level3} alt="level3 badge" style={{ width: "25%" }} />
        )}
        {totalCompletedPoints > 2000 && (
          <img src={level4} alt="level4 badge" style={{ width: "25%" }} />
        )}
      </Box>
    </Card>
  );
};

export default BadgesPoints;
