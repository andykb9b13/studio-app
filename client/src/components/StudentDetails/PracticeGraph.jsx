import React from "react";
import { Card, Typography } from "@mui/joy";
import sampleGraph from "../../assets/sampleGraph.png";
import { styles } from "../../styles/studentDetailsStyles";
import { BarChart } from "@mui/x-charts/BarChart";

const PracticeGraph = () => {
  return (
    <Card sx={styles.card}>
      <Typography level="h3">Practice Hours / Week</Typography>
      {/* <img
        src={sampleGraph}
        alt="sample graph of progress"
        style={{ width: "100%", marginInline: "auto" }}
      /> */}
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
    </Card>
  );
};

export default PracticeGraph;
