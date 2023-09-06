import React, { useState, useEffect } from "react";
import { Card, Typography, Table, IconButton, Switch } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { badgeList } from "../common/Assets";
import { styles } from "../../styles/studentDetailsStyles";
import RegularModal from "../common/Modal/RegularModal";
import SkillSheetCard from "../TeacherDashboard/SkillSheets/SkillSheetCard";
import { useMutation } from "@apollo/client";
import {
  COMPLETE_SKILLSHEET,
  REMOVE_COMPLETED_SKILLSHEET,
} from "../../utils/mutations";
import { useStudentContext } from "../../utils/Context";

const StudentSkillSheets = ({ teacher }) => {
  const { student } = useStudentContext();

  const [open, setOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState(null);
  const [completeSkillSheet] = useMutation(COMPLETE_SKILLSHEET);
  const [removeCompletedSkillSheet] = useMutation(REMOVE_COMPLETED_SKILLSHEET);
  const [checked, setChecked] = useState(false);
  const [completedSheetArr, setCompletedSheetArr] = useState([]);

  const checkIfSheetCompleted = (sheetId) => {
    const result = student.skillSheets?.filter(
      (skillSheet) => skillSheet._id === sheetId
    );
    console.log(result);
    if (result.length > 0) {
      return true;
    } else {
      return false;
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
    <Card sx={styles.card}>
      <Typography level="h2">Skill Sheets</Typography>
      <Table
        aria-label="basic table"
        sx={{
          borderRadius: "4px",
          boxShadow: "lg",
          p: 2,
          backgroundColor: "rgb(102, 46, 155, 0.2)",
        }}
      >
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Badge</th>
            <th>Points</th>
            <th>Difficulty</th>
            <th>Completed?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teacher &&
            teacher.skillSheets?.map((skillSheet) => (
              <tr key={skillSheet._id}>
                <td>{skillSheet.sheetName}</td>
                <td>
                  <img
                    src={
                      skillSheet.badgeId
                        ? badgeList[skillSheet.badgeId]?.name
                        : badgeList[0].name
                    }
                    alt="badge"
                    width="100%"
                  />
                </td>
                <td>{skillSheet.points}</td>
                <td>{skillSheet.difficulty}</td>
                <td>{checkIfSheetCompleted(skillSheet._id) ? "Yes" : "No"}</td>
                <td>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                      setActiveSheet(skillSheet);
                    }}
                  >
                    <VisibilityIcon color="info" />
                  </IconButton>
                  <RegularModal
                    open={open}
                    onRequestClose={() => setOpen(false)}
                  >
                    <SkillSheetCard
                      activeSheet={activeSheet}
                      handleCompleteSkillSheet={handleCompleteSkillSheet}
                      handleRemoveDeletedSkillSheet={
                        handleRemoveDeletedSkillSheet
                      }
                      checked={checked}
                      setChecked={setChecked}
                    />
                  </RegularModal>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default StudentSkillSheets;
