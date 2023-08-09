import React from "react";
import { Typography, List, ListItem, Grid, Divider } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import troubleshooting from "../../assets/troubleshooting.png";
import practiceHub from "../../assets/practiceHub.png";
import musicNotes from "../../assets/musicNotes.png";
import { styles } from "../../styles/homeStyles";

export default function AboutFeaturesCard() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4} sx={styles.grid}>
        <Typography level="h3">
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
          <Divider />
          <ListItem>
            Step by stp instructons for troubleshooting the problem
          </ListItem>
        </List>
      </Grid>
      <Grid xs={12} md={4} sx={styles.grid}>
        <Typography level="h3">Practice Hub for all your needs</Typography>
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
          <Divider />
          <ListItem>Go on a streak with a certain skill</ListItem>
          <Divider />
          <ListItem>View practice plans</ListItem>
        </List>
      </Grid>
      <Grid xs={12} md={4} sx={styles.grid}>
        <Typography level="h3">Skill Sheets to test abilities</Typography>

        <img
          className="hero-bg"
          src={musicNotes}
          style={styles.logo}
          alt="logo"
        />

        <List sx={styles.list}>
          <ListItem>Create skill sheets to challenge your students</ListItem>
          <Divider />
          <ListItem>Earn Badges for completing sheets</ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
