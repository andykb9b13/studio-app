import React from "react";
import { Typography } from "@mui/joy";
import StreakTable from "./StreakTable";

const StreakTrends = () => {
  return (
    <>
      <Typography level="h1" sx={{ color: "white" }} textAlign="center">
        Streak Trends (Test Data)
      </Typography>
      <StreakTable />
    </>
  );
};

export default StreakTrends;
