import React, { useState } from "react";
import { Card, Grid } from "@mui/joy";
import CreateSkillSheetContainer from "./CreateSkillSheetContainer";
import SkillSheetTable from "./SkillSheetTable";
import SkillSheetCard from "./SkillSheetCard";
import RegularModal from "../../common/Modal/RegularModal";
import { DELETE_SKILLSHEET } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useTeacherContext } from "../../../utils/Context";

// Component that controlls the skill sheet table and create skill sheet components
const SkillSheetContainer = () => {
  const [activeSheet, setActiveSheet] = useState(null); // state for the selected sheet to be displayed by the skillSheetCard component
  const [modalOpenIndex, setModalOpenIndex] = useState(null); // state for opening and closing the modal
  const { teacher } = useTeacherContext(); // get teacher info from context
  const [skillSheets, setSkillSheets] = useState(teacher.skillSheets); // state for the skill sheets to be displayed in the table
  const [deleteSkillSheet] = useMutation(DELETE_SKILLSHEET); // mutation for deleting a skill sheet

  // function for handling deleting a skill sheet
  const deleteSkillSheetFunc = async (skillSheetId) => {
    try {
      await deleteSkillSheet({
        variables: {
          skillSheetId: skillSheetId,
        },
      });
      alert("Skill Sheet deleted");
      setModalOpenIndex(null); // close modal
      handleDeleteSkillSheet(skillSheetId); // remove the deleted skill sheet from the skillSheets array
    } catch (err) {
      alert("Could not delete skill sheet");
      console.error(err);
    }
  };

  // function for removing the deleted skill sheet from the skillSheets array so it is no longer displayed
  const handleDeleteSkillSheet = (deletedSheetId) => {
    setSkillSheets(skillSheets.filter((sheet) => sheet._id !== deletedSheetId));
  };

  return (
    <Grid id="skillSheetContainer">
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
        <CreateSkillSheetContainer
          setSkillSheets={setSkillSheets}
          skillSheets={skillSheets}
        />
      </Card>
    </Grid>
  );
};

export default SkillSheetContainer;
