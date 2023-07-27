import React, { useState } from "react";
import { Card, Grid } from "@mui/joy";
import CreateSkillSheet from "./CreateSkillSheet";
import SkillSheetTable from "./SkillSheetTable";
import SkillSheetCard from "./SkillSheetCard";

const SkillSheets = () => {
  const [activeSheet, setActiveSheet] = useState(null);

  return (
    <Grid>
      <Card variant="outlined">
        <SkillSheetTable setActiveSheet={setActiveSheet} />
      </Card>
      {activeSheet && (
        <Card>
          <SkillSheetCard activeSheet={activeSheet} />
        </Card>
      )}
      <Card variant="outlined">
        <CreateSkillSheet />
      </Card>
    </Grid>
  );
};

export default SkillSheets;
