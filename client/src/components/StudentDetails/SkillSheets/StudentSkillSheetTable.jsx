import React, { useContext } from "react";
import { Sheet, Table, IconButton, Typography } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { badgeList } from "../../common/Assets";
import { MobileContext } from "../../../App";
import CountUp from "react-countup";

const StudentSkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setOpen,
  checkIfSheetCompleted,
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
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skillSheets?.map((skillSheet) => (
            <tr key={skillSheet._id}>
              <td
                onClick={() => {
                  setActiveSheet(skillSheet);
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
              <td>{checkIfSheetCompleted(skillSheet._id) ? "Yes" : "No"}</td>
              <td>
                <IconButton
                  onClick={() => {
                    setActiveSheet(skillSheet);
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon color="neutral" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default StudentSkillSheetTable;
