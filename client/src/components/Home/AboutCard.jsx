import React, { useContext } from "react";
import { Typography, Card, Divider, Box, List, ListItem } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import getOrganized from "../../assets/home/getOrganized.png";
import { styles } from "../../styles/homeStyles";
import liveSiteDemo3 from "../../assets/home/liveSiteDemo/liveSiteDemo3.png";
import liveSiteDemo2 from "../../assets/home/liveSiteDemo/liveSiteDemo2.png";
import liveSiteDemo10 from "../../assets/home/liveSiteDemo/liveSiteDemo10.png";
import { MobileContext } from "../../App";

export default function AboutCard() {
  const { isMobile } = useContext(MobileContext);

  return (
    <Animate anim="fade-right" height="100%">
      <Card
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,

          // height: "75vh",
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
        <Typography level="h3">Create Skill Sheets...</Typography>

        <img
          src={!isMobile ? liveSiteDemo3 : liveSiteDemo10}
          style={styles.image}
          alt="skill sheets"
        />
        <Typography level="h4" sx={{ textDecoration: "underline" }}>
          Flexibility and Customizable
        </Typography>
        <Typography>
          Teachers can create their own skill sheets to give students extra
          challenges and provide benchmark accomplishments for their entire
          studio.
        </Typography>
        <List>
          <ListItem>Create your own exercises and skills</ListItem>
          <ListItem>Select a difficulty</ListItem>
          <ListItem>
            Select from a list of badges for students to earn by completing the
            sheet.
          </ListItem>
        </List>
        <img
          src={liveSiteDemo2}
          style={styles.image}
          alt="create skill sheet"
        />
      </Card>
    </Animate>
  );
}
