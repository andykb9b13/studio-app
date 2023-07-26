import React from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  Card,
  Grid,
  Typography,
  Button,
  CardActions,
  CardContent,
} from "@mui/joy";
import CreateSkillSheet from "./CreateSkillSheet";

const SkillSheetView = ({ setStatus }) => {
  return (
    <Grid>
      <Card variant="outlined">
        <CardContent>
          <Typography level="h3">My Skill Sheets</Typography>
        </CardContent>
        <CardActions>
          <Button>Create Skill Sheet</Button>
        </CardActions>
      </Card>
      <Card variant="outlined">
        <CreateSkillSheet />
      </Card>
    </Grid>
  );
};

export default SkillSheetView;
