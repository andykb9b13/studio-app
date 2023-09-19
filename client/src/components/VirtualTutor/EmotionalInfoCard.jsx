import React from "react";
import { Card, List, ListItem, Typography } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";

const EmotionalInfoCard = ({ revealed, setRevealed }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Typography level="h2" textAlign={"center"}>
        Emotional
      </Typography>
      {revealed !== 4 && (
        <KeyboardArrowDownIcon onClick={() => setRevealed(4)} />
      )}
      {revealed === 4 && (
        <>
          <KeyboardControlKeyIcon onClick={() => setRevealed(null)} />
          <Typography>
            If we are comfortable with the visual, aural, and physical aspects
            of playing then we are able to spend time working on the emotional
            aspect. This is great news! It's a great day when you can spend most
            of your time considering the emotional quality of the music and how
            to interpret it instead of focusing on the nuts and bolts of
            playing. The emotional aspect includes but is certainly not limited
            to the following:
          </Typography>
          <List>
            <ListItem>
              <b>Storytelling</b>
            </ListItem>
            <ListItem>
              <b>Identifying the character of a section</b>
            </ListItem>
            <ListItem>
              <b>Researching the piece / composer</b>
            </ListItem>
            <ListItem>
              <b>Using references as comparisons</b>
            </ListItem>
            <ListItem>
              <b>Considering your personal experience</b>
            </ListItem>
            <ListItem>
              <b>Becoming a musical actor</b>
            </ListItem>
          </List>
          <Typography>
            Inexperience musicians spend much of their time focusing on{" "}
            <b>how to make sound</b> and not as much time considering{" "}
            <b>how to make music</b>. It can be challenging at first to spend
            time considering what the music is telling us and how we are going
            to communicate that to the audience. However, with practice and
            study, the sounds will begin to turn into music.
          </Typography>
          <Typography level="h5">Discover the story</Typography>
          <Typography>
            Not all music tells a definite story but that doesn't mean that we
            can't create one for it. Music is a series of{" "}
            <b>tensions and releases</b> and we can turn this into{" "}
            <b>conflict and resolution</b> in a story. It doesn't have to be a
            note for note storytelling but even setting the scene and some
            general story type can be helpful. For example:
          </Typography>
          <Typography level="body2">
            "This piece is like an epic tale where a hero goes off on a quest
            and meets enemies and has to overcome obstacles in order to achieve
            victory"
          </Typography>
          <Typography>OR</Typography>
          <Typography level="body2">
            "This piece is a love story but the two lovers don't end up with
            each other in the end.""
          </Typography>
          <Typography level="h5">Research the piece / composer </Typography>
          <Typography>
            Many pieces <b>DO</b> have a backstory with the composer and often
            times there was something happening in the composer's life that
            influenced the piece. If you can do a little bit of research about
            the composer and even the <b>historical context</b> of the piece,
            you will likely be more informed about how you can approach playing
            it.
          </Typography>
          <Typography level="h5">Identify the Character</Typography>
          <Typography>
            Even if you don't know what the "story" of the piece should be, you
            can likely provide some{" "}
            <b>words to describe what it "sounds like"</b>. This is like saying,
            "Is the piece 'happy' or 'sad'?". However, 'happy' and 'sad' only
            get you so far. How is 'happy' different from 'elated' or 'excited'?
            How is 'sad' different from 'depressed' or 'longing'? Each of these
            words provides a slightly different <b>shade of color</b> that you
            can use to color the piece with.{" "}
          </Typography>
          <Typography level="h5">Use References</Typography>
          <Typography>
            If you are very new to interpreting music, one of the easiest places
            to go for information on how to do it can be recordings. However,
            there are many pieces that have no existing recordings. Music has
            been an <b>aural tradition</b> for thousands of years and it is only
            very recently that music manuscript has entered the picture and even
            more recently since recordings have been available. For that reason,
            the absolute best thing to do is find someone who has studied, or
            better yet "lived", the culture of the music you are trying to play
            and absorb as much as possible from them. If you can't do that,
            recordings are another place you can look.
          </Typography>
          <Typography level="h5">Consider your personal experience</Typography>
          <Typography>
            If you have ever experienced moments of <b>great joy</b> or{" "}
            <b>terrible sadness</b> or <b>heartache</b> or{" "}
            <b>excited anticipation</b> or anything in between, then you have
            some personal experience to help guide you with the way the music
            could sound. If you are playing something that is fast and lively
            you might reflect on how you felt when you got some exciting news.
            If you are playing something in a minor key that is slow, you might
            consider how you felt when you got sick one time.
          </Typography>
          <Typography level="h5">Become a musical actor</Typography>
          <Typography>
            You don't have to be physically excited to play an "exciting" piece.
            You don't have to be in a state of grief in order to play a "funeral
            march". Good actors are able to <b>channel these emotions</b>{" "}
            without losing control of their mental awareness and physical
            presence. We should strive to do the same with our instruments. Our
            goal is to make the audience respond to the sounds we create in a
            certain way. If we can put on different hats when we play different
            pieces then we are becoming a musical actor!
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

export default EmotionalInfoCard;
