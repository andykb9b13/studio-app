import React from "react";
import {
  Card,
  Typography,
  Link,
  CardContent,
  List,
  ListItem,
  Box,
} from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";

const VisualInfoCard = ({ revealed, setRevealed }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Typography level="h2" textAlign={"center"}>
        Visual
      </Typography>
      {revealed !== 1 && (
        <KeyboardArrowDownIcon onClick={() => setRevealed(1)} />
      )}

      {revealed === 1 && (
        <>
          <KeyboardControlKeyIcon onClick={() => setRevealed(null)} />
          <CardContent>
            <Typography>
              This visual component of playing is all about being able to
              understand what the information on the page is telling you. This
              includes things like:
            </Typography>
            <List>
              <ListItem>
                <b>Pitch Names</b>
              </ListItem>
              <ListItem>
                <b>Positions or Fingerings</b>
              </ListItem>
              <ListItem>
                <b>Rhythms</b>
              </ListItem>
              <ListItem>
                <b>Key Signatures</b>
              </ListItem>
              <ListItem>
                <b>Time Signatures</b>
              </ListItem>
              <ListItem>
                <b>Dynamic markings</b>
              </ListItem>
              <ListItem>
                <b>Articulations</b>
              </ListItem>
            </List>
            <Typography sx={{ mb: 2 }}>
              If you are playing and you find yourself <b>hesitating</b> with
              any part of you body, like you arm or fingers, then it is most
              likely because of some visual aspect of the piece that you are not
              sure of.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Usually, what we end up doing is just trying to play it over and
              over and it sounds kind of like we are <b>stuttering</b> with the
              instrument. We are constantly <b>starting and stopping</b>. Not
              only is this frustrating to do but it also ends up encouraging{" "}
              <b>bad habits</b> in our technique. For wind students this may
              mean sloppier breaths, rushed fingerings, bad posture, or others.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <b>
                It is essential that you develop a quick identification of
                pitches, rhythms, and positions/fingerings.
              </b>{" "}
              Its just like reading a book. When reading this sentence, did you
              have to think about each letter and what sound it made? Certainly
              not and the reason is largely because of one big thing:{" "}
              <b>REPETETION</b>. You have seen these combinations of letters
              over and over in your life so now you recognize them quickly and
              without much effort. You want to achieve the same with music
              notation.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              The good news is that of the four elements of playing (Visual,
              Aural, Physical, Emotional){" "}
              <b>this is possibly the easiest to improve upon.</b> What you
              likely need to do is set the instrument down for a moment and{" "}
              <b>verbally say the pitches, rhythms, fingerings/positions.</b>{" "}
              All you are trying to do at the start is create a connection
              between your eyes/brain and the dots on the page. If you can say
              the pitches/rhythms/positions/fingerings then you have laid a good
              foundation for quick identification.
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
              <Typography level="h6" sx={{ mb: 2 }}>
                Extra Resources:
              </Typography>
              <Link
                href="https://sightreadingfactory.com"
                target="blank"
                sx={{ mb: 1 }}
              >
                Sightreading Factory
              </Link>
              <Link
                href="https://www.musictheory.net/"
                target="blank"
                sx={{ mb: 1 }}
              >
                www.musictheory.net
              </Link>
            </Card>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default VisualInfoCard;
