import React from "react";
import { Card, Typography, Box } from "@mui/joy";
import avatar1 from "../../assets/avatars/avatar1.png";
import level1 from "../../assets/badges/level1.png";
import level2 from "../../assets/badges/level2.png";

const BadgesPoints = () => {
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
      <Typography level="h3">Points: 450</Typography>
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        <img src={level1} alt="level1 badge" style={{ width: "25%" }} />
        <img src={level2} alt="level2 badge" style={{ width: "25%" }} />
      </Box>
    </Card>
  );
};

export default BadgesPoints;
