import React, { useState, useContext } from "react";
import { Card, Grid, Button } from "@mui/joy";
import CreateSkillSheet from "./CreateSkillSheet";
import SkillSheetTable from "./SkillSheetTable";
import SkillSheetCard from "./SkillSheetCard";
import RegularModal from "../../common/Modal/RegularModal";
import { TeacherContext } from "../../../pages/TeacherDashboard";
import { DELETE_SKILLSHEET } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";

const SkillSheetContainer = () => {
  const [activeSheet, setActiveSheet] = useState(null);
  const [modalOpenIndex, setModalOpenIndex] = useState(null);
  const { teacher } = useContext(TeacherContext);
  const [skillSheets, setSkillSheets] = useState(teacher.skillSheets);

  const [deleteSkillSheet, { error }] = useMutation(DELETE_SKILLSHEET);

  const createSkillSheetFunc = async (userInput) => {
    console.log("in handleSkillSheet");
  };

  const deleteSkillSheetFunc = async (skillSheetId) => {
    try {
      await deleteSkillSheet({
        variables: {
          skillSheetId: skillSheetId,
        },
      });
      alert("Skill Sheet deleted");
      setModalOpenIndex(null);
      handleDeleteSkillSheet(skillSheetId);
    } catch (err) {
      alert("Could not delete skill sheet");
      console.error(err);
    }
  };

  const handleDeleteSkillSheet = (deletedSheetId) => {
    setSkillSheets(skillSheets.filter((sheet) => sheet._id !== deletedSheetId));
  };
  return (
    <Grid>
      <Card variant="outlined">
        <SkillSheetTable
          setActiveSheet={setActiveSheet}
          skillSheets={skillSheets}
          setModalOpenIndex={setModalOpenIndex}
          modalOpenIndex={modalOpenIndex}
          onRequestClose={() => setModalOpenIndex(null)}
          deleteSkillSheetFunc={deleteSkillSheetFunc}
        />
      </Card>

      {/* Modal view of the skillsheet */}
      <RegularModal
        open={modalOpenIndex === 2}
        onRequestClose={() => setModalOpenIndex(null)}
      >
        <SkillSheetCard
          activeSheet={activeSheet}
          onRequestClose={() => setModalOpenIndex(null)}
        />
      </RegularModal>

      {/* Modal for creating a skillsheet */}
      <Card variant="outlined">
        <RegularModal
          open={modalOpenIndex === 3}
          onRequestClose={() => setModalOpenIndex(null)}
        >
          <CreateSkillSheet
            onRequestClose={() => setModalOpenIndex(null)}
            createSkillSheetFunc={createSkillSheetFunc}
          />
        </RegularModal>
        <Button onClick={() => setModalOpenIndex(3)}>Create Skill Sheet</Button>
      </Card>
    </Grid>
  );
};

export default SkillSheetContainer;
