import {
  Card,
  Typography,
  IconButton,
  Input,
  Checkbox,
  Box,
  FormLabel,
  FormControl,
} from "@mui/joy";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import { SpeechToText } from "../../common/SpeechToText";

// TODO create validation for the inputs so that they can't be misused
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
      {!active ? (
        <Card>
          <Typography
            level="h4"
            endDecorator={
              <IconButton
                onClick={() => {
                  setActive(false);
                  resetStreak();
                }}
              >
                <RefreshIcon />
              </IconButton>
            }
          >
            What are you working on?
          </Typography>
          <SpeechToText
            componentType="input"
            setOutputValue={setExerciseName}
            outputValue={exerciseName}
            placeholder={"Exercise name"}
          />
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <FormControl>
              <FormLabel>Tempo</FormLabel>
              <Input
                type="number"
                name="bpmInput"
                placeholder="beats per minute"
                value={bpm}
                onChange={(e) => {
                  bpm = e.target.value;
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Set the number of tries</FormLabel>
              <Input
                type="number"
                name="numInput"
                placeholder="Enter a number"
                onChange={(e) => {
                  tries = e.target.value;
                }}
              />
            </FormControl>
          </Box>
          <Checkbox
            label="Going for perfect?"
            name="perfectStreak"
            onChange={() => {
              perfectStreak = !perfectStreak;
            }}
          />
          <IconButton
            color="success"
            variant="soft"
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
          <IconButton
            onClick={() => {
              setActive(false);
              resetStreak();
            }}
          >
            <RefreshIcon />
          </IconButton>
          <Typography level="h2" sx={{ color: "var(--color5)" }}>
            {exerciseName}
          </Typography>
          <Typography level="h3">{bpm} bpm</Typography>
          {perfectStreak && (
            <Typography level="h3" sx={{ color: "var(--color4)" }}>
              Going for a perfect streak! {numTries} in a row.
            </Typography>
          )}
          <Typography level="h2">Tries Left: {triesLeft}</Typography>
        </>
      )}
    </Card>
  );
}
