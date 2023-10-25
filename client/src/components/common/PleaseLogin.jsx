import React from "react";
import { Link } from "react-router-dom";
import { Sheet, Card, Typography, CardOverflow, AspectRatio } from "@mui/joy";
import { styles } from "../../styles/cardstyles";
import pleaseLoginImg from "../../assets/pleaseLoginImg.png";

const PleaseLogin = () => {
  return (
    <Sheet sx={{ background: "transparent", height: "100vh" }}>
      <Card id="pleaseLoginCard" sx={styles.card}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={pleaseLoginImg} alt="please login" />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" textAlign={"center"}>
          Oops! It looks like you are not logged in.
        </Typography>
        <Typography level="h6" textAlign={"center"}>
          <Link to="/login">Teacher Login</Link>
        </Typography>
        <Typography level="h6" textAlign={"center"}>
          <Link to="/login">Student Login</Link>
        </Typography>
        <Typography
          level="body1"
          endDecorator={<Link to="/signup">Sign Up</Link>}
        >
          Not a User?
        </Typography>
        <Link to="/">Back to Home</Link>
      </Card>
    </Sheet>
  );
};

export default PleaseLogin;
