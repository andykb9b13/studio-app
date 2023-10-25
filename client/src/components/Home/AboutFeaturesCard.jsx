import React from "react";
import { Typography, List, ListItem, Grid, Divider } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import troubleshooting from "../../assets/home/troubleshooting.png";
import practiceHub from "../../assets/home/practiceHub.png";
import musicNotes from "../../assets/home/musicNotes.png";
import { styles } from "../../styles/homeStyles";

export default function AboutFeaturesCard() {
  return (
    <Animate anim="fade-right" height="100%">
      <Grid container spacing={2}>
        <Grid xs={12} md={4} sx={styles.grid}>
          <Typography level="h3">
            Having Trouble?...The virtual tutor is here!
          </Typography>

          <img
            className="hero-bg"
            src={troubleshooting}
            style={styles.logo}
            alt="troubleshooting"
          />

          <List sx={styles.list}>
            <ListItem sx={styles.listHover}>
              Get Help identifying the issue
            </ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>Start fixing the issue</ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>
              Step by step instructons for troubleshooting the problem
            </ListItem>
          </List>
        </Grid>
        <Grid xs={12} md={4} sx={styles.grid}>
          <Typography level="h3">Practice Hub for all your needs</Typography>

          <img
            className="hero-bg"
            src={practiceHub}
            style={styles.logo}
            alt="practice hub"
          />

          <List sx={styles.list}>
            <ListItem sx={styles.listHover}>Timed Practicing</ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>
              Go on a streak with a certain skill
            </ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>View practice plans</ListItem>
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
            <ListItem sx={styles.listHover}>
              Create skill sheets to challenge your students
            </ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>
              Earn Badges for completing sheets
            </ListItem>
            <Divider />
            <ListItem sx={styles.listHover}>
              Track your students' progress
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Animate>
  );
}
