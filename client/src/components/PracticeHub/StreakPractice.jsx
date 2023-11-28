import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/joy";
import RegularModal from "../common/Modal/RegularModal";
import { successResponseList } from "../common/Assets";
import { blunderResponseList } from "../common/Assets";
import { styles } from "../../styles/streakStyles";
import Counter from "./StreakPractice/Counter";
import { blunderMessages } from "./StreakPractice/ResponseMessages";
import { successMessages } from "./StreakPractice/ResponseMessages";
import { SuccessRate } from "./StreakPractice/SuccessRate";
import { Tries } from "./StreakPractice/Tries";
import { Response } from "./StreakPractice/Response";

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
  const [exerciseName, setExerciseName] = useState("");
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
    setExerciseName("");
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

  useEffect(() => {
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
    <Grid container mt={1}>
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
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
        />

        <Grid container sx={{ display: "flex" }}>
          <Grid lg={6} sm={12}>
            <Response
              responseImage={responseImage}
              responseMessage={responseMessage}
            />
          </Grid>
          <Grid lg={6}>
            <Counter
              title={"Successes"}
              count={successCount}
              setCount={setSuccessCount}
              numTries={numTries}
              setResult={setResult}
              totalTried={totalTried}
            />
            <Counter
              title={"Blunders"}
              count={blunderCount}
              setCount={setBlunderCount}
              numTries={numTries}
              setResult={setResult}
              totalTried={totalTried}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default StreakPractice;
