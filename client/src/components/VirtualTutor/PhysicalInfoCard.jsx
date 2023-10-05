import React from "react";
import { Card, Typography, List, ListItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";

const PhysicalInfoCard = ({ revealed, setRevealed }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Typography level="h2" textAlign={"center"}>
        Physical
      </Typography>
      {revealed !== 3 && (
        <KeyboardArrowDownIcon onClick={() => setRevealed(3)} />
      )}
      {revealed === 3 && (
        <>
          <KeyboardControlKeyIcon onClick={() => setRevealed(null)} />
          <Typography>
            The physical aspect of playing is all about coordinating the
            different parts of your body to work towards a common purpose.
            Physical <b>technique</b> is different for each instrument but many
            times it involves:
          </Typography>
          <List>
            <ListItem>
              <b>Posture</b>
            </ListItem>
            <ListItem>
              <b>Breath Control</b>
            </ListItem>
            <ListItem>
              <b>Limb movement (arms, legs, fingers, etc.)</b>
            </ListItem>
            <ListItem>
              <b>Embouchure / Grip</b>
            </ListItem>
            <ListItem>
              <b>Tongue Movement</b>
            </ListItem>
          </List>
          <Typography sx={{ mb: 2 }}>
            The challenge of playing an instrument is often tied to the physical
            challenges of making a <b>sound</b> and then making a{" "}
            <b>great sound</b>. While each instrument approaches sound creation
            differently, there are some particular things that all approaches
            emphasize in some form or another:
          </Typography>
          <Typography level="h5">
            Maintain an active but natural posture
          </Typography>
          <Typography>
            Having your body in an <b>active position</b> means that your
            muscles are ready to work <b>quickly and with bursts of energy</b>{" "}
            if necessary. However, being active does not mean being stiff or
            tense. Being stiff or tense is terrible for playing. First of all,
            it is exhausting to maintain a tense body state for long. Second,
            the tension in your toes finds a way up to your lips or fingers
            without you being aware of it. That's why having a{" "}
            <b>natural body state</b> where you feel like you can maitain that
            state for an extended period of time is essential.
          </Typography>
          <Typography level="h5">Keep the pressure low</Typography>
          <Typography>
            Almost all instruments require some kind of pushing or pressing or
            gripping in order to hold the instrument as well as play it.{" "}
            <b>
              It is essential to avoid gripping too hard or pressing too much or
              blowing too hard.
            </b>{" "}
            Using excessive pressure to create sound will ultimately backfire
            and turn into a vicious cycle of needing to use increasingly more
            pressure to play.
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
          </Card>
        </>
      )}
    </Card>
  );
};

export default PhysicalInfoCard;
