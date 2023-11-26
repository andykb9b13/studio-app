import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  Typography,
  Input,
  Grid,
  CardActions,
  IconButton,
} from "@mui/joy";
import RegularModal from "../common/Modal/RegularModal";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { successResponseList } from "../common/Assets";
import { blunderResponseList } from "../common/Assets";

const styles = {
  streakCard: {
    backgroundColor: "var(--color4)",
    mx: "auto",
    minWidth: "50%",
  },
  counterCard: {
    backgroundColor: "var(--color5)",
  },
  triesCard: {
    backgroundColor: "var(--color3)",
  },
};

const successMessages = [
  "All Right!",
  "Way to go!",
  "You're doing great!",
  "Amazing!",
  "That was it!!",
  "Holy Guacamole!",
  "Like a pro!",
  "You've got it!",
  "Totally tubular!",
  "Cowabunga dude!",
  "You are in it to win it!",
  "Keep it up!",
  "I'm impressed!",
  "It's all coming together now!",
  "Radical!",
  "It's Beautiful!",
  "You're on fire!",
  "Kicking butt!",
  "So good!",
  "Right on!",
];

const blunderMessages = [
  "Not quite...",
  "Try again...",
  "You're almost there...",
  "Hmmm....",
  "Keep trying...",
  "Oof...",
  "Once more unto the breach...",
  "Almost...",
  "Keep practicing...",
  "Better do that again...",
  "You're getting closer...",
  "Yeah...",
  "I think you'll get it next time...",
  "Close...",
  "What was that?...",
  "Persistence is the key...",
  "That was a stinker...",
  "Uhhh...",
  "Really?...",
];

function Counter({ title, count, setCount, numTries, setResult }) {
  console.log("count", count);
  return (
    <Card variant="outlined" sx={styles.counterCard}>
      <Typography level="h2">{title}</Typography>
      <Typography level="h3">{count}</Typography>
      {title === "Successes" && (
        <IconButton
          color="success"
          onClick={() => {
            setCount(count + 1);
            setResult("success");
            console.log("clicked");
          }}
          disabled={numTries === 0}
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
          disabled={numTries === 0}
        >
          <ThumbDownIcon />
        </IconButton>
      )}
    </Card>
  );
}

function SuccessRate({ percentage, resetStreak }) {
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
      <CardActions>
        <Button color="success" onClick={resetStreak}>
          Try Again
        </Button>
      </CardActions>
    </Card>
  );
}

function Tries({ setNumTries, triesLeft, resetStreak, active, setActive }) {
  let tries = 0;

  return (
    <Card variant="outlined">
      <Typography
        level="h2"
        endDecorator={
          <IconButton
            onClick={() => {
              setActive(false);
              resetStreak();
            }}
          >
            <RestartAltIcon />
          </IconButton>
        }
      >
        Number of Tries
      </Typography>
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
          <IconButton
            onClick={() => {
              setActive(true);
              setNumTries(tries);
            }}
          >
            <CheckIcon />
          </IconButton>
        </Card>
      ) : (
        <>
          <Typography level="h2">Tries Left: {triesLeft}</Typography>
        </>
      )}
    </Card>
  );
}

const Response = ({ responseMessage, responseImage }) => {
  return (
    <>
      <img src={responseImage} alt="emoji avatar" style={{ width: "300px" }} />
      <Typography level="h2" sx={{ color: "white" }}>
        "{responseMessage}"
      </Typography>
    </>
  );
};

const StreakPractice = ({ setStatus }) => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [responseMessage, setResponseMessage] = useState("Let's do this!");
  const [responseImage, setResponseImage] = useState(
    successResponseList[3].name
  );
  const [tempCount, setTempCount] = useState(0);
  const [active, setActive] = useState(false);
  const triesLeft = numTries - successCount - blunderCount;
  const totalTried = successCount + blunderCount;
  const percentage = Math.floor((successCount / totalTried) * 100) || 0;

  function resetStreak() {
    setResponseImage(successResponseList[3].name);
    setSuccessCount(0);
    setBlunderCount(0);
    setNumTries(0);
    setActive(false);
    setOpen(false);
    setResponseMessage("Let's do this!");
    setTempCount(0);
  }

  const updateSuccess = () => {
    const randomNum = Math.floor(Math.random() * successMessages.length);
    const randomImgNum = Math.floor(Math.random() * successResponseList.length);
    setResponseImage(successResponseList[randomImgNum].name);
    setResponseMessage(successMessages[randomNum]);
  };

  const updateBlunder = () => {
    const randomNum = Math.floor(Math.random() * blunderMessages.length);
    const randomImgNum = Math.floor(Math.random() * blunderResponseList.length);
    setResponseImage(blunderResponseList[randomImgNum].name);
    setResponseMessage(blunderMessages[randomNum]);
  };

  // TODO Need to redo this because if you do more than one success or blunder in a row, it won't rerender because it hasn't changed.
  useEffect(() => {
    // Something like if success > prevSuccess
    if (result === "success" && tempCount !== totalTried && totalTried !== 0) {
      updateSuccess();
      setTempCount(tempCount + 1);
    } else if (
      result === "blunder" &&
      tempCount !== totalTried &&
      totalTried !== 0
    ) {
      updateBlunder();
      setTempCount(tempCount + 1);
    }
  }, [result, tempCount, totalTried]);

  useEffect(() => {
    if ((successCount !== 0 || blunderCount !== 0) && triesLeft === 0) {
      setOpen(true);
    }
  }, [triesLeft, successCount, blunderCount]);

  return (
    <Grid container mt={4}>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SuccessRate percentage={percentage} resetStreak={resetStreak} />
      </RegularModal>
      <Card variant="outlined" sx={styles.streakCard}>
        <Tries
          active={active}
          setActive={setActive}
          setNumTries={setNumTries}
          triesLeft={triesLeft}
          resetStreak={resetStreak}
        />

        <Grid container sx={{ display: "flex" }}>
          <Grid lg={6} sm={12}>
            <Response
              responseImage={responseImage}
              responseMessage={responseMessage}
            />
          </Grid>
          <Grid lg={6} sm={12}>
            <Counter
              title={"Successes"}
              count={successCount}
              setCount={setSuccessCount}
              numTries={numTries}
              setResult={setResult}
            />
            <Counter
              title={"Blunders"}
              count={blunderCount}
              setCount={setBlunderCount}
              numTries={numTries}
              setResult={setResult}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default StreakPractice;
