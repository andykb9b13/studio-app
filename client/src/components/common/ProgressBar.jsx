import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";
import { Box } from "@mui/joy";

const ProgressBar = ({ percentage, width, height }) => {
  return (
    <Box sx={{ width: { width }, height: { height } }}>
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
