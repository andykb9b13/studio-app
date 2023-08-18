import { Button, Sheet, Table } from "@mui/joy";
import React, { useState } from "react";

const SkillSheetTable = ({
  setActiveSheet,
  skillSheets,
  setSheetModalOpen,
}) => {
  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>Sheet Name</th>
            <th>Exercises</th>
            <th>Scales</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {skillSheets.map((skillSheet) => (
            <tr key={skillSheet._id}>
              <td>{skillSheet.sheetName}</td>
              <td>{skillSheet.exercises}</td>
              <td>{skillSheet.scales}</td>
              <td>
                <Button
                  onClick={() => {
                    setActiveSheet(skillSheet);
                    setSheetModalOpen(true);
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default SkillSheetTable;
