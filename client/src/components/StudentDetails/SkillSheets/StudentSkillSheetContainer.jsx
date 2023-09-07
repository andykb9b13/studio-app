import React, { useContext, useState } from "react";
import { Card } from "@mui/joy";
import { styles } from "../../../styles/studentDetailsStyles";
import RegularModal from "../../common/Modal/RegularModal";
import StudentSkillSheetCard from "./StudentSkillSheetCard";
import { useMutation } from "@apollo/client";
import {
  COMPLETE_SKILLSHEET,
  REMOVE_COMPLETED_SKILLSHEET,
} from "../../../utils/mutations";
import { useStudentContext } from "../../../utils/Context";
import StudentSkillSheetTable from "./StudentSkillSheetTable";
import { MobileContext } from "../../../App";

const StudentSkillSheetContainer = ({ teacher }) => {
  const { student } = useStudentContext();
  const { isMobile } = useContext(MobileContext);

  const [open, setOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [completeSkillSheet] = useMutation(COMPLETE_SKILLSHEET);
  const [removeCompletedSkillSheet] = useMutation(REMOVE_COMPLETED_SKILLSHEET);
  const [checked, setChecked] = useState(false);
  const [completedSheetArr, setCompletedSheetArr] = useState(
    student.skillSheets
  );

  // Somthing weird happening with the rendering with this function.
  const checkIfSheetCompleted = async (sheetId) => {
    const result = student.skillSheets?.filter(
      (skillSheet) => skillSheet._id === sheetId
    );
    if (!result) {
      return false;
    } else if (result > 0) {
      return true;
    }
  };

  const handleCompleteSkillSheet = async (checked, skillSheetId) => {
    try {
      const { data } = await completeSkillSheet({
        variables: {
          skillSheetId: skillSheetId,
          studentId: student._id,
        },
      });
      alert("Added skill sheet completed!");
    } catch (err) {
      console.error(err);
      alert("Could not add skill sheet to completed");
    }
  };

  const handleRemoveDeletedSkillSheet = async (checked, skillSheetId) => {
    try {
      const { data } = await removeCompletedSkillSheet({
        variables: {
          skillSheetId: skillSheetId,
          studentId: student._id,
        },
      });
      alert("Removed skill sheet from completed");
    } catch (err) {
      console.error(err);
      alert("Could not remove skill sheet from completed");
    }
  };

  return (
    <Card sx={!isMobile ? styles.card : styles.mobileCard}>
      <StudentSkillSheetTable
        setActiveSheet={setActiveSheet}
        skillSheets={teacher.skillSheets}
        setOpen={setOpen}
        checkIfSheetCompleted={checkIfSheetCompleted}
      />
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <StudentSkillSheetCard
          activeSheet={activeSheet}
          handleCompleteSkillSheet={handleCompleteSkillSheet}
          handleRemoveDeletedSkillSheet={handleRemoveDeletedSkillSheet}
          checkIfSheetCompleted={checkIfSheetCompleted}
          checked={checked}
          setChecked={setChecked}
        />
      </RegularModal>
    </Card>
  );
};

export default StudentSkillSheetContainer;
