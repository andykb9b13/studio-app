import React, { useContext } from "react";
import { Typography, Card } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import student from "../../assets/home/student.png";
import { styles } from "../../styles/homeStyles";
import { MobileContext } from "../../App";
import liveSiteDemo1 from "../../assets/home/liveSiteDemo/liveSiteDemo1.png";
import liveSiteDemo4 from "../../assets/home/liveSiteDemo/liveSiteDemo4.png";
import liveSiteDemo11 from "../../assets/home/liveSiteDemo/liveSiteDemo11.png";

export default function AboutDatabaseCard() {
  const { isMobile } = useContext(MobileContext);

  return (
    <Animate anim="fade-left">
      <Card
        variant="outlined"
        sx={!isMobile ? styles.card : styles.mobileCard}
        height="75vh"
      >
        <Typography level="h2">
          Keep Track of Your Database of Students
        </Typography>
        <img
          className="hero-bg"
          src={student}
          style={styles.logo}
          alt="student database"
        />

        <Typography level="h2">Quick studio view...</Typography>
        <Typography>
          Quickly scan your studio database, easily add and delete students,
          search for students by first and last name as well as instrument or
          grade
        </Typography>
        <img
          src={liveSiteDemo4}
          style={styles.image}
          width={!isMobile ? "90%" : "100%"}
          alt="skill sheets"
        />
        <Typography level="h2">
          See progress across your entire studio...
        </Typography>
        <Typography>
          Track averages of points for skill sheets, assignments, and total
          points.
        </Typography>
        <img
          src={liveSiteDemo11}
          style={styles.image}
          width={!isMobile ? "50%" : "100%"}
          alt="skill sheets"
        />
        <Typography level="h2">Easily Edit Student information...</Typography>
        <Typography>
          Select custom avatars, update contact information, and more
        </Typography>
        <img
          src={liveSiteDemo1}
          style={styles.image}
          width={!isMobile ? "40%" : "100%"}
          alt="skill sheets"
        />
      </Card>
    </Animate>
  );
}
