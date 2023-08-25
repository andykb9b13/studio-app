import React from "react";
import { Card, CardContent, CardCover, Typography } from "@mui/joy";
import musicNotes from "../../../assets/home/musicNotes.png";
import { badgeList } from "../../common/Assets";

const SkillSheetCard = ({ activeSheet }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h2">{activeSheet.sheetName}</Typography>
      <Typography level="h3">
        {activeSheet.difficulty ? `Difficulty: ${activeSheet.difficulty}` : ""}
      </Typography>
      <Typography level="body1">{activeSheet.description}</Typography>
      <CardContent>
        <img
          src={
            activeSheet.badgeId
              ? badgeList[activeSheet.badgeId].name
              : badgeList[0].name
          }
          alt=""
          style={{ width: "30%" }}
        />
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
          <b>Points: </b>
          {activeSheet.sheetPoints}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkillSheetCard;
