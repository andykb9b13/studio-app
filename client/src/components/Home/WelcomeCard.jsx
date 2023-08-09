import React from "react";
import Auth from "../../utils/auth";
import Animate from "../../utils/ScrollAnimation";
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
import studioHubLogo from "../../assets/studioHubLogo.png";

export default function WelcomeCard() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    alert("You are successfully logged out");
  };
  return (
    <Card variant="outlined" sx={styles.card}>
      <Animate>
        <img
          className="hero-bg"
          src={studioHubLogo}
          style={styles.logo}
          alt="logo"
        />
      </Animate>
      <Typography level="h2">Welcome!</Typography>
      <Typography level="h6">
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
}
