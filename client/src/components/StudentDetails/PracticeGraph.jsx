import React from "react";
import { Card, Typography } from "@mui/joy";
import sampleGraph from "../../assets/sampleGraph.png";

const PracticeGraph = () => {
  return (
    <Card>
      <Typography level="h3">Practice Hours / Week</Typography>
      <img
        src={sampleGraph}
        alt="sample graph of progress"
        style={{ width: "100%", marginInline: "auto" }}
      />
    </Card>
  );
};

export default PracticeGraph;
