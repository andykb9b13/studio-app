import React, { useContext } from "react";
import { Button, Sheet, Table, IconButton, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import { badgeList } from "../../common/Assets";
import { MobileContext } from "../../../App";
import CountUp from "react-countup";

const SkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setModalOpenIndex,
  modalOpenIndex,
  deleteSkillSheetFunc,
}) => {
  const { isMobile } = useContext(MobileContext);
  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Badge</th>
            {!isMobile && <th>Exercises</th>}
            {!isMobile && <th>Scales</th>}
            <th>Points</th>
            <th>Difficulty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skillSheets?.map((skillSheet) => (
            <tr key={skillSheet._id}>
              <td
                onClick={() => {
                  setActiveSheet(skillSheet);
                  setModalOpenIndex(2);
                }}
              >
                <Typography level="h5">{skillSheet.sheetName}</Typography>
              </td>
              <td>
                <img
                  src={
                    skillSheet.badgeId
                      ? badgeList[skillSheet.badgeId].name
                      : badgeList[0].name
                  }
                  alt="badge"
                  style={{ width: "100%" }}
                  onClick={() => {
                    setActiveSheet(skillSheet);
                    setModalOpenIndex(2);
                  }}
                />
              </td>
              {!isMobile && (
                <td>
                  <Typography>{skillSheet.exercises}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>{skillSheet.scales}</Typography>
                </td>
              )}
              <td>
                <Typography>
                  <CountUp end={skillSheet.sheetPoints} />
                </Typography>
              </td>
              <td>
                <Typography>{skillSheet.difficulty}</Typography>
              </td>
              <td>
                {!isMobile && (
                  <IconButton
                    onClick={() => {
                      setActiveSheet(skillSheet);
                      setModalOpenIndex(2);
                    }}
                  >
                    <VisibilityIcon color="neutral" />
                  </IconButton>
                )}
                <IconButton onClick={() => setModalOpenIndex(4)} color="danger">
                  <DeleteIcon />
                </IconButton>
                <RegularModal
                  open={modalOpenIndex === 4}
                  onRequestClose={() => setModalOpenIndex(null)}
                >
                  <DeleteModalContent
                    onRequestClose={() => setModalOpenIndex(null)}
                    confirmAction={() => deleteSkillSheetFunc(skillSheet._id)}
                    resourceName="Skill Sheet"
                  />
                </RegularModal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default SkillSheetTable;
