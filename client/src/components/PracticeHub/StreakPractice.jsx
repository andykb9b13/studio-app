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
import StreakTrends from "./StreakPractice/StreakTrends";

const StreakPractice = ({ setStatus }) => {
  const [successCount, setSuccessCount] = useState(0);
  const [blunderCount, setBlunderCount] = useState(0);
  const [numTries, setNumTries] = useState(0);
  const [bpm, setBpm] = useState(null);
  const [perfectStreak, setPerfectStreak] = useState(false);
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

  // If the user wants to reset the parameters of the streak.
  function resetStreak() {
    setResponseImage(successResponseList[3].name); // This image in the list just happens to be the one I like as the default
    setActive(false); //setting the counters to be inactive and the tries component to be editable
    setOpen(false); // sets the modal to be closed
    setResponseMessage("Let's do this!");
    setTempCount(0);
    setSuccessCount(0);
    setBlunderCount(0);
    setNumTries(0);
    setExerciseName("");
    setBpm(null);
    setPerfectStreak(false);
  }

  // If the user wants to keep the same settings for their streak and log another one.
  function repeatStreak() {
    setResponseImage(successResponseList[3].name);
    setSuccessCount(0);
    setBlunderCount(0);
    setOpen(false); // sets the modal to be closed
    setResponseMessage("Let's do it again!");
    setTempCount(0);
  }

  /* This generates a random image from the successResponseList and a random message from the successMesssages list
  and then updates the state */
  const updateSuccess = () => {
    const randomNum = Math.floor(Math.random() * successMessages.length);
    const randomImgNum = Math.floor(Math.random() * successResponseList.length);
    setResponseImage(successResponseList[randomImgNum].name);
    setResponseMessage(successMessages[randomNum]);
  };

  /* This generates a random image from the blunderResponseList and a random message form the blunderMessages list
  and then updates the state */
  const updateBlunder = () => {
    const randomNum = Math.floor(Math.random() * blunderMessages.length);
    const randomImgNum = Math.floor(Math.random() * blunderResponseList.length);
    setResponseImage(blunderResponseList[randomImgNum].name);
    setResponseMessage(blunderMessages[randomNum]);
  };

  /* This checks which result is triggered from the counter components (success or blunder).
  The tempCount is used to update the state in the event that there are two "successes" or "blunders" in a row.
  Otherwise, the state wouldn't update because the value of result would not have changed. 
  Temp count should always be 1 behind totalTried */
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

  // This opens the modal if the tries are at 0 but the user has logged at least 1 success or blunder.
  // Otherwise, the modal would open immediately and the user would not be able to do a streak.
  useEffect(() => {
    if ((successCount !== 0 || blunderCount !== 0) && triesLeft === 0) {
      setOpen(true);
    }
  }, [triesLeft, successCount, blunderCount]);

  return (
    <Grid container mt={1}>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SuccessRate
          percentage={percentage}
          resetStreak={resetStreak}
          repeatStreak={repeatStreak}
        />
      </RegularModal>
      <Card variant="outlined" sx={styles.streakCard}>
        <Tries
          active={active}
          setActive={setActive}
          numTries={numTries}
          setNumTries={setNumTries}
          triesLeft={triesLeft}
          resetStreak={resetStreak}
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
          bpm={bpm}
          setBpm={setBpm}
          perfectStreak={perfectStreak}
          setPerfectStreak={setPerfectStreak}
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
      <Card variant="outlined" sx={styles.streakCard}>
        <StreakTrends />
      </Card>
    </Grid>
  );
};

export default StreakPractice;
