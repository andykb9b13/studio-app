import React, { useContext } from "react";
import { Sheet, Table, IconButton, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import { badgeList } from "../../common/Assets";
import { MobileContext } from "../../../App";
import CountUp from "react-countup";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { sortSheets } from "../../../utils/utilities";

// Component for displaying a table of skill sheets
const SkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setModalOpenIndex,
  modalOpenIndex,
  deleteSkillSheetFunc,
}) => {
  const { isMobile } = useContext(MobileContext); // get isMobile state from context to determine if the table should display all columns or not

  // set the initial sorting of the sheets
  let sortedSheets = null;
  if (skillSheets) {
    sortedSheets = sortSheets(skillSheets);
  }

  return (
    <Sheet id="skillSheetTableContainer">
      <Table id="skillSheetTable">
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Badge</th>
            {!isMobile && <th>Description</th>}
            {!isMobile && <th>Scales</th>}
            {!isMobile && <th>Files</th>}
            <th>Points</th>
            <th>Difficulty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedSheets?.map((skillSheet) => (
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
                      ? badgeList[skillSheet.badgeId]?.name
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
                  <Typography>{skillSheet.description}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>{skillSheet.scales}</Typography>
                </td>
              )}
              {!isMobile && (
                <td>
                  <Typography>
                    <a href={skillSheet.url} target="blank">
                      <IconButton
                        color={skillSheet.url ? "success" : "neutral"}
                        disabled={skillSheet.url ? false : true}
                      >
                        <FilePresentIcon />
                      </IconButton>
                    </a>
                  </Typography>
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

                {/* Delete Skill Sheet */}
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
