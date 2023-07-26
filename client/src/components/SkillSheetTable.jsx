import { Button, Sheet, Table } from "@mui/joy";
import React, { useContext } from "react";
import { TeacherContext } from "../pages/TeacherDashboard";

const SkillSheetTable = ({ setActiveSheet }) => {
  const { teacher } = useContext(TeacherContext);

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
          {teacher.skillSheets.map((skillSheet) => (
            <tr key={skillSheet._id}>
              <td>{skillSheet.sheetName}</td>
              <td>{skillSheet.exercises}</td>
              <td>{skillSheet.scales}</td>
              <td>
                <Button onClick={() => setActiveSheet(skillSheet)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default SkillSheetTable;
