import React, { useContext, useState, useEffect } from "react";
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
  const [completedArr, setCompletedArr] = useState([]);
  console.log(completedArr);

  useEffect(() => {
    setCompletedArr(student.skillSheets);
  }, [setCompletedArr, student]);

  console.log(checked);

  const handleSkillSheetChange = async (checked, skillSheetId) => {
    if (checked === true) {
      console.log(skillSheetId);
      try {
        const { data } = await completeSkillSheet({
          variables: {
            skillSheetId: skillSheetId,
            studentId: student._id,
          },
        });
        console.log(data);

        alert("Added skill sheet completed!");
      } catch (err) {
        console.error(err);
        alert("Could not add skill sheet to completed");
      }
    } else {
      console.log(skillSheetId);
      try {
        await removeCompletedSkillSheet({
          variables: {
            skillSheetId: skillSheetId,
            studentId: student._id,
          },
        });
        alert("Removed skill sheet from completed");
      } catch (err) {
        console.error(err);
        alert("could not remove skill sheet from completed");
      }
    }
  };

  return (
    <Card sx={!isMobile ? styles.card : styles.mobileCard}>
      <StudentSkillSheetTable
        setActiveSheet={setActiveSheet}
        skillSheets={teacher.skillSheets}
        setOpen={setOpen}
        completedArr={completedArr}
        // checkIfSheetCompleted={checkIfSheetCompleted}
      />
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <StudentSkillSheetCard
          activeSheet={activeSheet}
          handleSkillSheetChange={handleSkillSheetChange}
          // checkIfSheetCompleted={checkIfSheetCompleted}
          checked={checked}
          setChecked={setChecked}
        />
      </RegularModal>
    </Card>
  );
};

export default StudentSkillSheetContainer;
