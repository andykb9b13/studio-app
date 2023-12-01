import React from "react";
import { Table } from "@mui/joy";

const StreakTable = () => {
  const fakeData = [
    ["3/6/23", "Bb Major Scale", 5, 4, 1, "80%", 3, "No"],
    ["3/6/23", "Bb Major Scale", 6, 3, 3, "50%", 2, "No"],
    ["4/1/23", "G Major Scale", 4, 0, 4, "0%", 0, "No"],
    ["4/1/23", "G Major Scale", 5, 5, 0, "100%", 5, "Yes"],
    ["4/1/23", "G Major Scale", 10, 7, 3, "70%", 4, "No"],
    ["4/8/23", "Rochut No.1 first 4 bars", 4, 2, 2, "50%", 1, "No"],
    ["4/8/23", "Rochut No.1 first 4 bars", 8, 6, 2, "80%", 3, "No"],
  ];

  return (
    <Table variant="solid">
      <thead>
        <tr>
          <th>Date</th>
          <th>Exercise Name</th>
          <th>Total Tries</th>
          <th>Successes</th>
          <th>Blunders</th>
          <th>Success Rate</th>
          <th>Best in a row</th>
          <th>Perfect?</th>
        </tr>
      </thead>
      <tbody>
        {fakeData &&
          fakeData.map((streak, i) => (
            <tr key="i">
              <td>{streak[0]}</td>
              <td>{streak[1]}</td>
              <td>{streak[2]}</td>
              <td>{streak[3]}</td>
              <td>{streak[4]}</td>
              <td>{streak[5]}</td>
              <td>{streak[6]}</td>
              <td>{streak[7]}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default StreakTable;
