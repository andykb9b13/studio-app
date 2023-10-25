import React from "react";
import { Link } from "react-router-dom";
import { Sheet, Card, Typography, CardOverflow, AspectRatio } from "@mui/joy";
import notFoundImg from "../../assets/notFoundImg.png";
import { styles } from "../../styles/cardstyles";

const NotFound = () => {
  return (
    <Sheet sx={{ background: "transparent", height: "100vh" }}>
      <Card id="NotFound" sx={styles.card}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={notFoundImg} alt="404" />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" textAlign={"center"}>
          Whoops, that page doesn't exist
        </Typography>
        <Link to="/">Travel back to the Homepage</Link>
      </Card>
    </Sheet>
  );
};

export default NotFound;
