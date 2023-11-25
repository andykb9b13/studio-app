import React, { useState, useEffect } from "react";
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
import { badgeList } from "../common/Assets";

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
  "High Five!",
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
  "Don't give up...",
  "You're getting closer...",
  "You're getting better...",
  "I think you'll get it next time...",
  "Close...",
  "Persistence is the key...",
  "It'll come, don't worry...",
  "You're doing good work...",
];

function Counter({ title, count, setCount, numTries, setResult }) {
  return (
    <Grid lg={6}>
      <Card variant="outlined" sx={styles.counterCard}>
        <Typography level="h2">{title}</Typography>
        <Typography level="h3">{count}</Typography>
        {title.toLowerCase() === "successes" && (
          <IconButton color="success">
            <ThumbUpIcon
              onClick={() => {
                setCount(count + 1);
                setResult("success");
              }}
              disabled={numTries === 0}
            />
          </IconButton>
        )}
        {title.toLowerCase() === "blunders" && (
          <IconButton color="danger">
            <ThumbDownIcon
              onClick={() => {
                setCount(count + 1);
                setResult("blunder");
              }}
              disabled={numTries === 0}
            />
          </IconButton>
        )}
      </Card>
    </Grid>
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

function Tries({ numTries, setNumTries, triesLeft, resetStreak }) {
  const [active, setActive] = useState(false);
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

const ResponseMessage = ({ message, responseImage }) => {
  return (
    <>
      <Typography level="h1">{message}</Typography>
      <img src={responseImage.name} alt="response" sx={{ width: "100px" }} />
    </>
  );
};

const StreakPractice = ({ setStatus }) => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const [open, setOpen] = useState(false);
  const [responseOpen, setResponseOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [responseImage, setResponseImage] = useState(null);
  const triesLeft = numTries - successCount - blunderCount;
  const totalTried = successCount + blunderCount;
  const percentage = Math.floor((successCount / totalTried) * 100) || 0;

  function resetStreak() {
    setSuccessCount(0);
    setBlunderCount(0);
    setNumTries(0);
    setOpen(false);
  }

  useEffect(() => {
    if (result === "success") {
      const randomNum = Math.floor(Math.random() * successMessages.length);
      const randomImgNum = Math.floor(Math.random() * badgeList.length);
      setResponseImage(badgeList[randomImgNum]);
      setMessage(successMessages[randomNum]);
      setResponseOpen(true);
    } else if (result === "blunder") {
      const randomNum = Math.floor(Math.random() * blunderMessages.length);
      const randomImgNum = Math.floor(Math.random() * badgeList.length);
      setResponseImage(badgeList[randomImgNum]);
      setMessage(blunderMessages[randomNum]);
      setResponseOpen(true);
    }
  }, [result]);

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
      <RegularModal
        open={responseOpen}
        onRequestClose={() => {
          setMessage(null);
          setResponseOpen(false);
        }}
      >
        <ResponseMessage message={message} responseImage={responseImage} />
      </RegularModal>
      <Card variant="outlined" sx={styles.streakCard}>
        <Tries
          numTries={numTries}
          setNumTries={setNumTries}
          triesLeft={triesLeft}
          resetStreak={resetStreak}
        />

        <Grid sx={{ display: "flex" }}>
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
      </Card>
    </Grid>
  );
};

export default StreakPractice;
