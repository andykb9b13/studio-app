import React, { useState, useContext } from "react";
import { Card, Grid, Button } from "@mui/joy";
import CreateSkillSheet from "./CreateSkillSheet";
import SkillSheetTable from "./SkillSheetTable";
import SkillSheetCard from "./SkillSheetCard";
import RegularModal from "../../common/Modal/RegularModal";
import { TeacherContext } from "../../../pages/TeacherDashboard";

const SkillSheetContainer = () => {
  const [activeSheet, setActiveSheet] = useState(null);
  const [open, setOpen] = useState(false);
  const { teacher } = useContext(TeacherContext);
  const [skillSheets, setSkillSheets] = useState(teacher.skillSheets);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);

  const createSkillSheetFunc = async (userInput) => {
    console.log("in handleSkillSheet");
  };

  return (
    <Grid>
      <Card variant="outlined">
        <SkillSheetTable
          setActiveSheet={setActiveSheet}
          skillSheets={skillSheets}
          setSheetModalOpen={setSheetModalOpen}
        />
      </Card>

      <RegularModal
        open={sheetModalOpen}
        onRequestClose={() => setSheetModalOpen(false)}
      >
        <SkillSheetCard
          activeSheet={activeSheet}
          onRequestClose={() => setSheetModalOpen(false)}
        />
      </RegularModal>
      <Card variant="outlined">
        <RegularModal open={open} onRequestClose={() => setOpen(false)}>
          <CreateSkillSheet
            onRequestClose={() => setOpen(false)}
            createSkillSheetFunc={createSkillSheetFunc}
            setSheetModalOpen={setSheetModalOpen}
          />
        </RegularModal>
        <Button onClick={() => setOpen(true)}>Create Skill Sheet</Button>
      </Card>
    </Grid>
  );
};

export default SkillSheetContainer;
