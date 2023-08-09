import React from "react";
import { Typography, Card, List, ListItem } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import musicNotes from "../../assets/musicNotes.png";
import { styles } from "../../styles/homeStyles";

export default function AboutSkillSheetCard() {
  return (
    <Animate anim="fade-right" height="100%">
      <Card variant="outlined" sx={styles.card}>
        <Typography level="h2">Skill Sheets to test abilities</Typography>
        <img
          className="hero-bg"
          src={musicNotes}
          style={styles.logo}
          alt="logo"
        />
        <List sx={styles.list}>
          <ListItem>Create skill sheets to challenge your students</ListItem>
          <ListItem>Earn Badges for completing sheets</ListItem>
        </List>
      </Card>
    </Animate>
  );
}
