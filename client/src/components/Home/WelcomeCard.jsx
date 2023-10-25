import React, { useContext } from "react";
import Auth from "../../utils/auth";
import { styles } from "../../styles/homeStyles";
import {
  Card,
  Typography,
  List,
  ListItem,
  CardActions,
  Button,
  Box,
  Divider,
} from "@mui/joy";
import { Link } from "react-router-dom";
import studioHubLogo from "../../assets/home/studioHubLogo.png";
import { MobileContext } from "../../App";

export default function WelcomeCard() {
  const { isMobile } = useContext(MobileContext);

  const redirectToProfile = () => {
    if (Auth.teacherLoggedIn()) {
      const userId = Auth.getProfile().data._id;
      window.location.assign(`/teacher/${userId}`);
    } else {
      const userId = Auth.getProfile().data._id;
      window.location.assign(`/teacher/studentDetails/${userId}`);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };

  return (
    <Card variant="outlined" sx={!isMobile ? styles.card : styles.mobileCard}>
      <img
        className="hero-bg"
        src={studioHubLogo}
        style={styles.logo}
        alt="logo"
      />
      <Typography level="h2">Welcome!</Typography>
      <Typography level="h6" textAlign={"center"}>
        Welcome to Studio Hub. The one place where you can manage all of your
        music studio needs so that your lessons can be more efficient,
        productive, and versitile.
      </Typography>
      <List sx={styles.list}>
        <ListItem>Create your own student databse</ListItem>
        <Divider />
        <ListItem>Create assignment plans for you students</ListItem>
        <Divider />
        <ListItem>Track your students' progress</ListItem>
        <Divider />
        <ListItem>
          Use the Troubleshooting hub to help students identify what needs work
        </ListItem>
        <Divider />
        <ListItem>Access external resources for students</ListItem>
      </List>

      <CardActions>
        {Auth.loggedIn() && (
          <Box>
            <Button onClick={redirectToProfile}>Go To Profile</Button>
          </Box>
        )}
        <Button
          component={Link}
          to="/signup"
          color="success"
          variant="soft"
          size="lg"
        >
          Teacher Sign Up
        </Button>
      </CardActions>
    </Card>
  );
}
