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
          Please Login
        </Typography>
        <Typography textAlign={"center"}>
          <Link to="/login">Login...</Link>
        </Typography>
      </Card>
    </Sheet>
  );
};

export default PleaseLogin;
