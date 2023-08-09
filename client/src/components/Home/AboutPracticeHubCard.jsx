import React from "react";
import { Typography, Card, List, ListItem } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import practiceHub from "../../assets/practiceHub.png";
import { styles } from "../../styles/homeStyles";

export default function AboutPracticeHubCard() {
  return (
    <Animate anim="fade-left" height="100%">
      <Card variant="outlined" sx={styles.card}>
        <Typography level="h2">Practice Hub for all your needs</Typography>
        <img
          className="hero-bg"
          src={practiceHub}
          style={styles.logo}
          alt="practice hub"
        />
        <List sx={styles.list}>
          <ListItem>Timed Practicing</ListItem>
          <ListItem>Go on a streak with a certain skill</ListItem>
          <ListItem>View practice plans</ListItem>
          <ListItem>Track your progress</ListItem>
        </List>
      </Card>
    </Animate>
  );
}
