import React from "react";
import { Card, CardContent, Typography } from "@mui/joy";

const SkillSheetCard = ({ activeSheet }) => {
  return (
    <React.Fragment>
      <Card variant="outlined">
        <Typography level="h2">{activeSheet.sheetName}</Typography>
        <Typography level="body1">{activeSheet.description}</Typography>
        <CardContent>
          <Typography>
            <b>Scales: </b>
            {activeSheet.scales}
          </Typography>
          <Typography>
            <b>Arpeggios: </b>
            {activeSheet.arpeggios}
          </Typography>
          <Typography>
            <b>Articulation: </b>
            {activeSheet.articulations}
          </Typography>
          <Typography>
            <b>Slurs: </b>
            {activeSheet.slurs}
          </Typography>
          <Typography>
            <b>Long Tones: </b>
            {activeSheet.longTones}
          </Typography>
          <Typography>
            <b>Exercises: </b>
            {activeSheet.exercises}
          </Typography>
          <Typography>
            <b>Etudes: </b>
            {activeSheet.etudes}
          </Typography>
          <Typography>
            <b>Pieces: </b>
            {activeSheet.pieces}
          </Typography>
          <Typography>
            <b>Completed: </b>
            {activeSheet.completed}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default SkillSheetCard;
