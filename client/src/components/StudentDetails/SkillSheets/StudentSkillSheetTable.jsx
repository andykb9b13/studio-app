import React, { useContext } from "react";
import { Sheet, Table, IconButton, Typography } from "@mui/joy";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { badgeList } from "../../common/Assets";
import { MobileContext } from "../../../App";
import CountUp from "react-countup";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const StudentSkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setOpen,
  completedArr,
}) => {
  const { isMobile } = useContext(MobileContext);

  return (
    <Sheet
      sx={{
        maxHeight: "450px",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "vertical",
      }}
    >
      <Table stickyHeader>
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Badge</th>
            {!isMobile && <th>Description</th>}
            {!isMobile && <th>Scales</th>}
            <th>Points</th>
            {!isMobile && <th>Difficulty</th>}
            <th>Files</th>
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
                  <Typography>{skillSheet.description}</Typography>
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

              {!isMobile && (
                <td>
                  <Typography>{skillSheet.difficulty}</Typography>
                </td>
              )}
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
              <td>{completedArr.includes(skillSheet._id) ? "Yes" : "No"}</td>
              <td>
                <NavigateNextIcon
                  onClick={() => {
                    setActiveSheet(skillSheet);
                    setOpen(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default StudentSkillSheetTable;
