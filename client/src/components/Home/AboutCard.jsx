import React, { useContext } from "react";
import { Typography, Card, List, ListItem, Grid } from "@mui/joy";
import Animate from "../../utils/ScrollAnimation";
import getOrganized from "../../assets/home/getOrganized.png";
import { styles } from "../../styles/homeStyles";
import liveSiteDemo3 from "../../assets/home/liveSiteDemo/liveSiteDemo3.png";
import liveSiteDemo2 from "../../assets/home/liveSiteDemo/liveSiteDemo2.png";
import liveSiteDemo8 from "../../assets/home/liveSiteDemo/liveSiteDemo8.png";
import liveSiteDemo9 from "../../assets/home/liveSiteDemo/liveSiteDemo9.png";
import liveSiteDemo10 from "../../assets/home/liveSiteDemo/liveSiteDemo10.png";
import liveSiteDemo13 from "../../assets/home/liveSiteDemo/liveSiteDemo13.png";
import { MobileContext } from "../../App";

export default function AboutCard() {
  const { isMobile } = useContext(MobileContext);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        <Typography level="h2">Customizable Tools and Resources...</Typography>

        <img
          className="hero-bg"
          src={getOrganized}
          style={styles.logo}
          alt="get organized"
        />
        <Typography level="h3">Create Skill Sheets...</Typography>

        <img
          src={!isMobile ? liveSiteDemo3 : liveSiteDemo10}
          style={styles.image}
          width={!isMobile ? "70%" : "80%"}
          alt="skill sheets"
        />

        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid xs={12} lg={4}>
            <Typography level="h4" sx={{ textDecoration: "underline" }}>
              Flexibility and Customizable
            </Typography>
            <Typography level="h6">
              Teachers can create their own skill sheets to give students extra
              challenges and provide benchmark accomplishments for their entire
              studio.
            </Typography>

            <List>
              <ListItem>Create your own exercises and skills</ListItem>
              <ListItem>Select a difficulty</ListItem>
              <ListItem>
                Select from a list of badges for students to earn by completing
                the sheet.
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} lg={4} pl={2}>
            <img
              src={liveSiteDemo2}
              style={styles.image}
              width={!isMobile ? "400px" : "80%"}
              alt="create skill sheet"
            />
          </Grid>
        </Grid>

        <Typography level="h3">Make Practice Plans...</Typography>
        <Typography>
          Create practice plans for students to keep them on track. Students and
          teachers can track their progress in each plan to see how much they
          have accomplished.
        </Typography>

        <img
          src={liveSiteDemo9}
          style={styles.image}
          width={!isMobile ? "70%" : "100%"}
          alt="create practice plan"
        />

        <Grid container display={"flex"} justifyContent={"space-around"}>
          <Grid xs={12} lg={4}>
            <Typography level="h3">Add Assignments...</Typography>
            <Typography>
              Add Assignments and give points for completing the assignment.
            </Typography>
            <img
              src={liveSiteDemo13}
              style={styles.image}
              width={!isMobile ? "400px" : "100%"}
              alt="create practice plan"
            />
          </Grid>
          <Grid xs={12} lg={4}>
            <Typography level="h3">Add Resources...</Typography>
            <Typography>
              Add resources to help students with their assignments. Resources
              can either be uploaded or an existing url can be used.
            </Typography>
            <img
              src={liveSiteDemo8}
              style={styles.image}
              width={!isMobile ? "300px" : "75%"}
              alt="create practice plan"
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
