import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Sheet,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
} from "@mui/joy";

const styles = {
  card: {
    width: "90%",
    mx: "auto",
    my: 4,
  },
  list: {
    listStyleType: "disc",
    marginLeft: 24,
  },
};

const WelcomeCard = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };
  return (
    <Card variant="outlined" sx={styles.card}>
      <CardContent>
        <Typography level="h1" component="h1">
          Studio Hub
        </Typography>
        <Typography level="h2" component="h2">
          Welcome!
        </Typography>
        <Typography level="h6" component="p">
          Welcome to the Studio Management App. The one place where you can
          manage all of your music studio needs so that your lessons can be more
          efficient, productive, and versitile.
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
      </CardContent>
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
  );
};

const AboutCard = () => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">Get Organized...</Typography>
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
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">
        Keep Track of Your Database of Students
      </Typography>
      <List sx={styles.list}>
        <ListItem>Search for students by age, instrument, or name</ListItem>
        <ListItem>View Weekly Practice Plans</ListItem>
        <ListItem>View emails</ListItem>
        <ListItem>Edit student information</ListItem>
      </List>
    </Card>
  );
};

const AboutSkillSheetCard = () => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">Skill Sheets to test abilities</Typography>
      <List sx={styles.list}>
        <ListItem>Create skill sheets to challenge your students</ListItem>
        <ListItem>Earn Badges for completing sheets</ListItem>
      </List>
    </Card>
  );
};

const AboutPracticeHubCard = () => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">Practice Hub for all your needs</Typography>
      <List sx={styles.list}>
        <ListItem>Timed Practicing</ListItem>
        <ListItem>Go on a streak with a certain skill</ListItem>
        <ListItem>View practice plans</ListItem>
        <ListItem>Track your progress</ListItem>
      </List>
    </Card>
  );
};

const AboutVirtualTutorCard = () => {
  return (
    <Card variant="outlined" sx={styles.card}>
      <Typography level="h2">
        Having Trouble?...The virtual tutor is here!
      </Typography>
      <List sx={styles.list}>
        <ListItem>Get Help identifying the issue</ListItem>
        <ListItem>
          Step by stp instructons for troubleshooting the problem
        </ListItem>
      </List>
    </Card>
  );
};

const Home = () => {
  return (
    <Sheet>
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
