import React from "react";
import { Card, CardContent, Typography, Switch, IconButton } from "@mui/joy";
import { badgeList } from "../../common/Assets";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const SkillSheetCard = ({
  activeSheet,
  checked,
  setChecked,
  completedArr,
  handleSkillSheetChange,
}) => {
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
      <img
        src={
          activeSheet.badgeId
            ? badgeList[activeSheet.badgeId].name
            : badgeList[0].name
        }
        alt=""
        style={{ width: "50%" }}
      />

      <Typography level="body1">{activeSheet.description}</Typography>
      <CardContent>
        {activeSheet.url && (
          <>
            <Typography>
              <b>View Files</b>
            </Typography>
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

        <Typography>
          <b>Points: </b>
          {activeSheet.sheetPoints || 0}
        </Typography>
        <Typography>
          <b>Completed?</b>
        </Typography>
        <Switch
          checked={completedArr.includes(activeSheet._id)}
          color={completedArr.includes(activeSheet._id) ? "success" : "danger"}
          onChange={(event) => {
            const newChecked = event.target.checked;
            setChecked(newChecked);
            handleSkillSheetChange(newChecked, activeSheet._id);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SkillSheetCard;
