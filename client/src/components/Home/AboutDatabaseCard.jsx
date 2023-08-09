import React from "react";
import { Typography, Card, List, ListItem } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import student from "../../assets/student.png";
import { styles } from "../../styles/homeStyles";

export default function AboutDatabaseCard() {
  return (
    <Animate anim="fade-left" height="100%">
      <Card variant="outlined" sx={styles.card}>
        <Typography level="h2">
          Keep Track of Your Database of Students
        </Typography>
        <img
          className="hero-bg"
          src={student}
          style={styles.logo}
          alt="student database"
        />
        <List sx={styles.list}>
          <ListItem>Search for students by age, instrument, or name</ListItem>
          <ListItem>View Weekly Practice Plans</ListItem>
          <ListItem>View emails</ListItem>
          <ListItem>Edit student information</ListItem>
        </List>
      </Card>
    </Animate>
  );
}
