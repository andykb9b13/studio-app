import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Sheet, Card, Typography, Input, Grid, Box } from "@mui/joy";

function Counter({ title, count, setCount, numTries }) {
  return (
    <Card variant="outlined">
      <Typography level="h2">{title}</Typography>
      <Typography level="h3">{count}</Typography>
      <Button
        color="success"
        onClick={() => {
          setCount(count + 1);
        }}
        disabled={numTries === 0}
      >
        Add
      </Button>
      <Button
        color="danger"
        onClick={() => {
          setCount(count - 1);
        }}
        disabled={numTries === 0}
      >
        Delete
      </Button>
    </Card>
  );
}

function SuccessRate({ percentage }) {
  let message = "Let's do this!";
  if (percentage <= 25) {
    message = "Don't give up!";
  } else if (percentage <= 50) {
    message = "Not bad! Keep working on it.";
  } else if (percentage <= 75) {
    message = "You're doing great. Go for 100%";
  } else if (percentage < 100) {
    message = "You're sooooo close!";
  } else if (percentage === 100) {
    message = "Awesome! You got it!";
  }

  return (
    <Card variant="outlined">
      <Typography level="h2">Success Rate</Typography>
      <Typography level="h4">{percentage} % success rate</Typography>
      <Typography level="h4">{message}</Typography>
    </Card>
  );
}

function Tries({ numTries, setNumTries, triesLeft }) {
  const [active, setActive] = useState(false);
  let tries = 0;

  return (
    <Card variant="outlined">
      <Typography level="h2">Number of Tries</Typography>
      {!active ? (
        <Card>
          <Typography level="h4">Set the number of tries</Typography>
          <Input
            type="number"
            name="numInput"
            onChange={(e) => {
              tries = e.target.value;
            }}
          />
          <Button
            onClick={() => {
              setActive(true);
              setNumTries(tries);
            }}
          >
            Save
          </Button>
        </Card>
      ) : (
        <>
          <Button onClick={() => setActive(false)}>Reset Tries</Button>
          <Typography level="h2">Tries Left: {triesLeft}</Typography>
        </>
      )}
    </Card>
  );
}

const StreakPractice = ({ setStatus }) => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const triesLeft = numTries - successCount - blunderCount;
  const totalTried = successCount + blunderCount;
  const percentage = Math.floor((successCount / totalTried) * 100) || 0;

  function resetStreak() {
    setSuccessCount(0);
    setBlunderCount(0);
    setNumTries(0);
  }

  return (
    <Grid container mt={4}>
      <Card variant="outlined" sx={{ mx: "auto", minWidth: "50%" }}>
        <Typography level="h1">Streak Practice</Typography>
        <Button onClick={resetStreak}>Reset Streak</Button>
        <Tries
          numTries={numTries}
          setNumTries={setNumTries}
          triesLeft={triesLeft}
        />
        <Grid>
          <Counter
            title={"Successes"}
            count={successCount}
            setCount={setSuccessCount}
            numTries={numTries}
          />
          <Counter
            title={"Blunders"}
            count={blunderCount}
            setCount={setBlunderCount}
            numTries={numTries}
          />
        </Grid>
        <SuccessRate percentage={percentage} />

        <Button
          onClick={() => {
            setStatus("home");
          }}
        >
          Back to Practice Hub
        </Button>
      </Card>
    </Grid>
  );
};

export default StreakPractice;
