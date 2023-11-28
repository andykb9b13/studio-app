import { Card, Typography, IconButton, Input } from "@mui/joy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { SpeechToText } from "../../common/SpeechToText";

export function Tries({
  setNumTries,
  triesLeft,
  resetStreak,
  active,
  setActive,
  exerciseName,
  setExerciseName,
}) {
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
          <Typography level="h4">What are you working on?</Typography>
          <SpeechToText
            componentType="input"
            setOutputValue={setExerciseName}
            outputValue={exerciseName}
          />
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
          <Typography level="h2">{exerciseName}</Typography>
          <Typography level="h2">Tries Left: {triesLeft}</Typography>
        </>
      )}
    </Card>
  );
}
