import React from "react";
import { Typography, Card, Box } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import getOrganized from "../../assets/getOrganized.png";
import { styles } from "../../styles/homeStyles";

export default function AboutCard() {
  return (
    <Animate anim="fade-right" height="100%">
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          height: "75vh",
        }}
      >
        <Typography level="h2">Get Organized...</Typography>

        <img
          className="hero-bg"
          src={getOrganized}
          style={styles.logo}
          alt="get organized"
        />

        <Typography level="body1">
          It is tough to stay on top of students, assignments, invoices, and
          more when you are running a private teaching studio. This app is all
          about helping you manage it easier!
        </Typography>
      </Box>
    </Animate>
  );
}
