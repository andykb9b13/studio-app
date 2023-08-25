import React from "react";
import { Card, Typography, Table } from "@mui/joy";

import { badgeList } from "../common/Assets";

const SkillSheetCard = ({ teacher }) => {
  return (
    <Card variant="outlined">
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
              </tr>
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default SkillSheetCard;
