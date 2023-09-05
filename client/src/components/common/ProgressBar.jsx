import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";
import { Box } from "@mui/joy";

const ProgressBar = ({ percentage }) => {
  return (
    <Box sx={{ width: "200px", height: "200px" }}>
      <CircularProgressbar
        value={percentage}
        text={percentage + "%"}
        styles={buildStyles({
          strokeLinecap: "butt",
        })}
      />
    </Box>
  );
};

export default ProgressBar;
