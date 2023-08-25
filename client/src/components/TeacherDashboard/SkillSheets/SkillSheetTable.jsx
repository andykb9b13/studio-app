import { Button, Sheet, Table, IconButton } from "@mui/joy";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";

const SkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setModalOpenIndex,
  modalOpenIndex,
  deleteSkillSheetFunc,
}) => {
  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Exercises</th>
            <th>Scales</th>
            <th>Points</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skillSheets?.map((skillSheet) => (
            <tr key={skillSheet._id}>
              <td>{skillSheet.sheetName}</td>
              <td>{skillSheet.exercises}</td>
              <td>{skillSheet.scales}</td>
              <td>{skillSheet.points}</td>
              <td>
                <Button
                  onClick={() => {
                    setActiveSheet(skillSheet);
                    setModalOpenIndex(2);
                  }}
                >
                  View
                </Button>
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
