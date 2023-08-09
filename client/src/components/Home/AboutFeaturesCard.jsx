import React from "react";
import { Typography, Card, List, ListItem, Grid } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import troubleshooting from "../../assets/troubleshooting.png";
import practiceHub from "../../assets/practiceHub.png";
import musicNotes from "../../assets/musicNotes.png";
import { styles } from "../../styles/homeStyles";

export default function AboutFeaturesCard() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        p: 2,
      }}
    >
      <Grid xs={12} md={4}>
        <Typography level="h2">
          Having Trouble?...The virtual tutor is here!
        </Typography>
        <Animate>
          <img
            className="hero-bg"
            src={troubleshooting}
            style={styles.logo}
            alt="troubleshooting"
          />
        </Animate>
        <List sx={styles.list}>
          <ListItem>Get Help identifying the issue</ListItem>
          <ListItem>
            Step by stp instructons for troubleshooting the problem
          </ListItem>
        </List>
      </Grid>

      <Grid xs={12} md={4}>
        <Typography level="h2">Practice Hub for all your needs</Typography>
        <Animate>
          <img
            className="hero-bg"
            src={practiceHub}
            style={styles.logo}
            alt="practice hub"
          />
        </Animate>
        <List sx={styles.list}>
          <ListItem>Timed Practicing</ListItem>
          <ListItem>Go on a streak with a certain skill</ListItem>
          <ListItem>View practice plans</ListItem>
        </List>
      </Grid>
      <Grid xs={12} md={4}>
        <Typography level="h2">Skill Sheets to test abilities</Typography>
        <Animate>
          <img
            className="hero-bg"
            src={musicNotes}
            style={styles.logo}
            alt="logo"
          />
        </Animate>
        <List sx={styles.list}>
          <ListItem>Create skill sheets to challenge your students</ListItem>
          <ListItem>Earn Badges for completing sheets</ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
