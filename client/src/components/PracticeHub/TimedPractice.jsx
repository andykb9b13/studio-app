import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Input,
  Grid,
  Box,
  CardActions,
} from "@mui/joy";

const TimedPractice = ({ student }) => {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimerFunc = () => {
    setTimer(
      setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            clearInterval(timer);
            console.log("Time's up!");
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000)
    );
  };

  const stopTimerFunc = () => {
    clearInterval(timer);
    setTimer(null);
    setCount(0);
  };

  useEffect(() => {
    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <Grid container mt={4}>
      <Card variant="outlined" sx={{ mx: "auto" }}>
        <Typography level="h2">Timed Practice</Typography>
        <Typography level="body1">
          Hi there <b>{student.firstName}</b>! Are you ready to practice your{" "}
          {student.instrument}?
        </Typography>
        <Box mx="auto">
          <Typography
            variant="outlined"
            color="primary"
            sx={{ fontSize: "10em" }}
          >
            {count}
          </Typography>
        </Box>
        <CardContent>
          <Typography level="h3">Set Time</Typography>
          <Input
            type="number"
            placeholder="seconds"
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
          />
        </CardContent>
        <CardActions sx={{ mx: "auto" }}>
          <Button color="success" onClick={startTimerFunc}>
            Start
          </Button>
          <Button color="danger" onClick={stopTimerFunc}>
            Stop
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TimedPractice;
