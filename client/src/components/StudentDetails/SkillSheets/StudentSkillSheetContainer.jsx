import React, { useContext, useState, useEffect } from "react";
import { Card, Typography } from "@mui/joy";
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
  const [completedArr, setCompletedArr] = useState([]);

  useEffect(() => {
    setCompletedArr(student.skillSheets?.map((sheet) => sheet._id));
  }, [setCompletedArr, student]);

  const handleSkillSheetChange = async (checked, skillSheetId) => {
    if (checked === true) {
      try {
        const { data } = await completeSkillSheet({
          variables: {
            skillSheetId: skillSheetId,
            studentId: student._id,
          },
        });
        setCompletedArr([...completedArr, skillSheetId]);
        alert("Added skill sheet completed!");
      } catch (err) {
        console.error(err);
        alert("Could not add skill sheet to completed");
      }
    } else {
      try {
        await removeCompletedSkillSheet({
          variables: {
            skillSheetId: skillSheetId,
            studentId: student._id,
          },
        });
        setCompletedArr(completedArr.filter((id) => id !== skillSheetId));
        alert("Removed skill sheet from completed");
      } catch (err) {
        console.error(err);
        alert("could not remove skill sheet from completed");
      }
    }
  };

  return (
    <Card sx={!isMobile ? styles.card : styles.mobileCard}>
      <Typography level="h2">Skill Sheets</Typography>
      <StudentSkillSheetTable
        setActiveSheet={setActiveSheet}
        skillSheets={teacher.skillSheets}
        setOpen={setOpen}
        completedArr={completedArr}
      />
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <StudentSkillSheetCard
          activeSheet={activeSheet}
          handleSkillSheetChange={handleSkillSheetChange}
          completedArr={completedArr}
          checked={checked}
          setChecked={setChecked}
        />
      </RegularModal>
    </Card>
  );
};

export default StudentSkillSheetContainer;
