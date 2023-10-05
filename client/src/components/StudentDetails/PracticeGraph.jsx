import React from "react";
import { Card, Typography } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";

const PracticeGraph = () => {
  return (
    <Card sx={styles.card}>
      <Typography level="h3">Practice Hours / Week</Typography>
      {/* <img
        src={sampleGraph}
        alt="sample graph of progress"
        style={{ width: "100%", marginInline: "auto" }}
      /> */}
    </Card>
  );
};

export default PracticeGraph;
