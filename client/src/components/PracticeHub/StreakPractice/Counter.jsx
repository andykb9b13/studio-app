import React from "react";
import { Card, Typography, IconButton } from "@mui/joy";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { styles } from "../../../styles/streakStyles";

export default function Counter({
  title,
  count,
  setCount,
  numTries,
  setResult,
  totalTried,
}) {
  return (
    <Card variant="outlined" sx={styles.counterCard}>
      <Typography level="h2" textAlign="center">
        {title}
      </Typography>
      <Typography level="h3" textAlign="center">
        {count}
      </Typography>
      {title === "Successes" && (
        <IconButton
          color="success"
          onClick={() => {
            setCount(count + 1);
            setResult("success");
            console.log("clicked");
          }}
          disabled={numTries === 0 || parseInt(numTries) === totalTried}
        >
          <ThumbUpIcon />
        </IconButton>
      )}
      {title === "Blunders" && (
        <IconButton
          color="danger"
          onClick={() => {
            setCount(count + 1);
            setResult("blunder");
          }}
          disabled={numTries === 0 || parseInt(numTries) === totalTried}
        >
          <ThumbDownIcon />
        </IconButton>
      )}
    </Card>
  );
}
