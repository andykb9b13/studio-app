import { Card, Typography, IconButton, Input, Checkbox } from "@mui/joy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckIcon from "@mui/icons-material/Check";
import { SpeechToText } from "../../common/SpeechToText";

export function Tries({
  setNumTries,
  numTries,
  triesLeft,
  resetStreak,
  active,
  setActive,
  exerciseName,
  setExerciseName,
  bpm,
  setBpm,
  perfectStreak,
  setPerfectStreak,
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
            placeholder={"Exercise name"}
          />
          <Typography level="h3">Tempo</Typography>
          <Input
            type="number"
            name="bpmInput"
            placeholder="beats per minute"
            value={bpm}
            onChange={(e) => {
              bpm = e.target.value;
            }}
          />
          <Typography level="h4">Set the number of tries</Typography>
          <Input
            type="number"
            name="numInput"
            placeholder="Enter a number"
            onChange={(e) => {
              tries = e.target.value;
            }}
          />
          <Checkbox
            label="Going for perfect?"
            name="perfectStreak"
            onChange={() => {
              perfectStreak = !perfectStreak;
            }}
          />
          <IconButton
            onClick={() => {
              setActive(true);
              setNumTries(tries);
              setBpm(bpm);
              setPerfectStreak(perfectStreak);
            }}
          >
            <CheckIcon />
          </IconButton>
        </Card>
      ) : (
        <>
          <Typography level="h2" sx={{ color: "var(--color5)" }}>
            {exerciseName}
          </Typography>
          <Typography level="h3">{bpm} bpm</Typography>
          {perfectStreak && (
            <Typography level="h3">
              Going for a perfect streak! {numTries} in a row.
            </Typography>
          )}
          <Typography level="h2">Tries Left: {triesLeft}</Typography>
        </>
      )}
    </Card>
  );
}
