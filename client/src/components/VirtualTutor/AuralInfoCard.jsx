import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Box,
  Link,
  CardContent,
} from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";

const AuralInfoCard = ({ revealed, setRevealed }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Typography level="h2" textAlign={"center"}>
        Aural
      </Typography>
      {revealed !== 2 && (
        <KeyboardArrowDownIcon onClick={() => setRevealed(2)} />
      )}
      {revealed === 2 && (
        <>
          <KeyboardControlKeyIcon onClick={() => setRevealed(null)} />
          <CardContent>
            <Typography>
              The aural component of playing is about being able to hear what
              you are trying to play "inside" of your head. Since it's very hard
              to see what's actually going on inside of your head, we have to
              use some tools to test if we are connecting aurally with the
              music. This mainly includes:
            </Typography>
            <List>
              <ListItem>
                <b>SINGING!!!</b>
              </ListItem>
            </List>
            <Typography sx={{ mb: 2 }}>
              I know...I know...most of the time when instrumentalists hear this
              they let out a giant groan of disapproval. "Do I really have to
              sing?" "I'm not a singer!" (unless you are, in which case
              congratulations this is right up your wheelhouse!){" "}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <b>
                This is the main tool you have to check whether or not you are
                hearing the pitch you are trying to play.
              </b>{" "}
              It can be intimidating at first because many people are not
              confident in their vocal abilites. The great thing is that you've
              been practicing with your voice since you were a baby (with some
              notable exceptions).
            </Typography>
            <Typography sx={{ mb: 2 }}>
              If you start out small, just trying to match a single pitch in a
              comfortable part of your vocal range (probably your speaking
              range) then you can build from there.{" "}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              It can be absolutely startling to see how quickly a passage that
              felt impossible becomes doable once you are sure you are hearing
              the right pitches.
            </Typography>

            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              variant="outlined"
            >
              <Typography level="h6">Extra Resources:</Typography>
              <Link
                href="http://dronetonetool.com"
                target="blank"
                sx={{ mb: 1 }}
              >
                Drone Tone Tool
              </Link>
              <Link
                href="https://www.bandmatetuner.com/"
                target="blank"
                sx={{ mb: 1 }}
              >
                Band Mate Tuner
              </Link>
            </Card>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default AuralInfoCard;
