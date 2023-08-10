import React from "react";
import { Typography, Card, List, ListItem, Divider } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import student from "../../assets/home/student.png";
import { styles } from "../../styles/homeStyles";

export default function AboutDatabaseCard() {
  return (
    <Animate anim="fade-left">
      <Card variant="outlined" sx={styles.card} height="75vh">
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
          <Divider />
          <ListItem>View Weekly Practice Plans</ListItem>
          <Divider />
          <ListItem>View emails</ListItem>
          <Divider />
          <ListItem>Edit student information</ListItem>
        </List>
      </Card>
    </Animate>
  );
}
