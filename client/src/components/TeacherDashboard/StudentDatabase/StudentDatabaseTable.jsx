import React, { useEffect, useState } from "react";
import { Sheet, Table, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const StudentDatabaseTable = ({ students }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Setting the isMobile state to true if the window width is less than or equal to 768px
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

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
            {!isMobile ? <th>Instrument</th> : null}
            {!isMobile ? <th>Primary Contact</th> : null}
            {!isMobile ? <th>Grade</th> : null}
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
                {!isMobile ? <td>{student.instrument}</td> : null}
                {!isMobile ? <td>{student.primaryContact}</td> : null}
                {!isMobile ? <td>{student.grade}</td> : null}
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
