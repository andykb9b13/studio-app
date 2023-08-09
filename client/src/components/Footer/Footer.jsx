import React from "react";
import { Grid, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>Created by Andy Kleindienst</Typography>
      <Link to="https://github.com/andykb9b13">Github</Link>
      <Link to="https://www.linkedin.com/in/andy-kleindienst-12283226b/">
        LinkedIn
      </Link>
    </Grid>
  );
}
