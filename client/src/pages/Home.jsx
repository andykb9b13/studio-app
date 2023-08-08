import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Sheet,
  Button,
  Typography,
  Box,
  Card,
  CardActions,
  List,
  ListItem,
} from "@mui/joy";
import Animate from "../utils/ScrollAnimation";
import studioHubLogo from "../assets/studioHubLogo.png";
import musicNotes from "../assets/musicNotes.png";
import student from "../assets/student.png";
import troubleshooting from "../assets/troubleshooting.png";
import getOrganized from "../assets/getOrganized.png";
import practiceHub from "../assets/practiceHub.png";
import musicNoteBkgd from "../assets/musicNoteBkgd.png";

const styles = {
  card: {
    width: "80%",
    mx: "auto",
    my: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: 1,
    boxShadow: "lg",
  },
  list: {
    listStyleType: "disc",
    marginLeft: 24,
  },
  logo: {
    borderRadius: "50%",
    width: "200px",
    border: "4px solid black",
    transition: "all 0.2s",
    "&:hover": {
      border: "20px solid green",
    },
  },
  sheet: {
    backgroundColor: "rgb(102, 46, 155, 0.3)",
  },
};

const WelcomeCard = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };
  return (
    <Animate anim="fade-right" height="100%">
      <Card variant="outlined" sx={styles.card}>
        <img
          className="hero-bg"
          src={studioHubLogo}
          style={styles.logo}
          alt="logo"
        />

        <Typography level="h2" component="h2">
          Welcome!
        </Typography>

        <Typography level="h6" component="p">
          Welcome to Studio Hub. The one place where you can manage all of your
          music studio needs so that your lessons can be more efficient,
          productive, and versitile.
        </Typography>
        <List sx={styles.list}>
          <ListItem>Create your own student databse</ListItem>
          <ListItem>Create assignment plans for you students</ListItem>
          <ListItem>Track your students' progress</ListItem>
          <ListItem>
            Use the Troubleshooting hub to help students identify what needs
            work
          </ListItem>
          <ListItem>Access external resources for students</ListItem>
        </List>

        <CardActions>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          {Auth.loggedIn() && (
            <Box>
              <Button onClick={logout}>Logout</Button>
              <Button>Go To Profile</Button>
            </Box>
          )}
          <Link to="/signup">
            <Button>Teacher Sign Up</Button>
          </Link>
        </CardActions>
      </Card>
    </Animate>
  );
};

const AboutCard = () => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">Get Organized...</Typography>
      <Animate anim="fade-left" height="100%">
        <img
          className="hero-bg"
          src={getOrganized}
          style={styles.logo}
          alt="get organized"
        />
      </Animate>
      <Typography level="body1">
        It is tough to stay on top of students, assignments, invoices, and more
        when you are running a private teaching studio. This app is all about
        helping you manage it easier!
      </Typography>
    </Card>
  );
};

const AboutDatabaseCard = () => {
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
};

const AboutSkillSheetCard = () => {
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
};

const AboutPracticeHubCard = () => {
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
};

const AboutVirtualTutorCard = () => {
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
};

const Home = () => {
  return (
    <Sheet sx={styles.sheet}>
      <WelcomeCard />
      <AboutCard />
      <AboutDatabaseCard />
      <AboutSkillSheetCard />
      <AboutPracticeHubCard />
      <AboutVirtualTutorCard />
    </Sheet>
  );
};

export default Home;
