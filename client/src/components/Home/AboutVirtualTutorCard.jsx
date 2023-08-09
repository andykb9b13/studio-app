import React from "react";
import { Typography, Card, List, ListItem } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import troubleshooting from "../../assets/troubleshooting.png";
import { styles } from "../../styles/homeStyles";

export default function AboutVirtualTutorCard() {
  return (
    <Animate anim="fade-right" height="100%">
      <Card variant="outlined" sx={styles.card}>
        <Typography level="h2">
          Having Trouble?...The virtual tutor is here!
        </Typography>
        <img
          className="hero-bg"
          src={troubleshooting}
          style={styles.logo}
          alt="troubleshooting"
        />
        <List sx={styles.list}>
          <ListItem>Get Help identifying the issue</ListItem>
          <ListItem>
            Step by stp instructons for troubleshooting the problem
          </ListItem>
        </List>
      </Card>
    </Animate>
  );
}
