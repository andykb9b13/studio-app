import React from "react";
import { Sheet, Table, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const StudentDatabaseTable = ({ students }) => {
  return (
    <Sheet>
      <Table
        aria-label="basic table"
        stickyHeader
        sx={{
          borderRadius: "4px",
          boxShadow: "lg",
          p: 2,
          backgroundColor: "lavender",
        }}
      >
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Instrument</th>
            <th>Primary Contact</th>
            <th>Grade</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student, i) => (
              <tr key={i}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>{student.instrument}</td>
                <td>{student.primaryContact}</td>
                <td>{student.grade}</td>
                <td>
                  <Link to={`/teacher/studentDetails/${student._id}`}>
                    <Button>View Student Info</Button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default StudentDatabaseTable;
