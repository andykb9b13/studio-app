import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";

const ProgressBar = ({ percentage }) => {
  return (
    <CircularProgressbar
      value={percentage}
      text={percentage + "%"}
      styles={buildStyles({
        strokeLinecap: "butt",
      })}
    />
  );
};

export default ProgressBar;
