import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/joy";
import { badgeList } from "../../common/Assets";
import FilePresentIcon from "@mui/icons-material/FilePresent";

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

        {activeSheet.scales && (
          <Typography>
            <b>Scales: </b>
            {activeSheet.scales}
          </Typography>
        )}
        {activeSheet.exercises && (
          <Typography>
            <b>Exercises: </b>
            {activeSheet.exercises}
          </Typography>
        )}
        {activeSheet.etudes && (
          <Typography>
            <b>Etudes: </b>
            {activeSheet.etudes}
          </Typography>
        )}
        {activeSheet.pieces && (
          <Typography>
            <b>Pieces: </b>
            {activeSheet.pieces}
          </Typography>
        )}
        {activeSheet.url && (
          <>
            <Typography>Click to view uploaded files</Typography>
            <Typography>
              <a href={activeSheet.url} target="blank">
                <IconButton
                  color={activeSheet.url ? "success" : "neutral"}
                  disabled={activeSheet.url ? false : true}
                >
                  <FilePresentIcon />
                </IconButton>
              </a>
            </Typography>
          </>
        )}
        <Typography>
          <b>Points: </b>
          {activeSheet.sheetPoints || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkillSheetCard;
