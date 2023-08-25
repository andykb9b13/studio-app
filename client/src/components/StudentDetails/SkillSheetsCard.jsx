import React, { useContext } from "react";
import { Card, Typography, Table } from "@mui/joy";
import goGetter from "../../assets/badges/goGetter.png";
import climbingHigh from "../../assets/badges/climbingHigh.png";
import { StudentContext } from "../../pages/StudentDetails";
import { badgeList } from "../common/Assets";

const SkillSheetCard = ({ teacher }) => {
  const { student } = useContext(StudentContext);
  console.log(teacher.skillSheets);

  return (
    <Card variant="outlined">
      <Typography level="h2">Skill Sheets</Typography>
      <Table
        aria-label="basic table"
        stickyHeader
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
          </tr>
        </thead>
        <tbody>
          {teacher &&
            teacher.skillSheets?.map((skillSheet) => (
              <tr key={skillSheet._id}>
                <td>{skillSheet.sheetName}</td>
                <td>
                  <img src={badgeList[skillSheet.badgeId].name} alt="badge" />
                </td>
                <td>{skillSheet.points}</td>
                <td>{skillSheet.difficulty}</td>
              </tr>
            ))}
          <tr>
            <td>Gettin Started</td>
            <td>
              <img src={goGetter} alt="" width={"60%"} />
            </td>
            <td>50</td>
            <td>Beginner</td>
          </tr>
          <tr>
            <td>Movin On</td>
            <td>
              <img src={climbingHigh} alt="" width={"60%"} />
            </td>
            <td>75</td>
            <td>Beginner</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default SkillSheetCard;
