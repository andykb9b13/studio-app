import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import CreateStudent from "../components/CreateStudent";
import { Sheet, Box, Button, Typography, Grid, Input, Table } from "@mui/joy";

const StudentDatabase = () => {
  // getting the students using StudentContext.jsx

  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });
  const [clicked, setClicked] = useState(false);
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  const students = data?.teacher.students || [];

  return (
    <Sheet>
      <Typography
        level="h1"
        component="h1"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Student Database
      </Typography>
      <Box
        sx={{
          width: "75%",
          mx: "auto",
          backgroundColor: "lightblue",
          borderRadius: "4px",
          boxShadow: "lg",
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            level="h2"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Studio Info
          </Typography>
          <Input
            type="text"
            name="studentSearch"
            id="studentSearch"
            placeholder="Search for a student"
            sx={{ my: 2 }}
          />
          <Button
            onClick={() => {
              handleClick();
            }}
            sx={{ my: 2 }}
          >
            {clicked ? "Cancel" : "Add Student"}
          </Button>
        </Box>

        {clicked ? <CreateStudent teacherId={id} /> : ""}

        <Sheet>
          <Table aria-label="basic table">
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
        {/* Boxes containing individual student info */}
        {/* <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          {students &&
            students.map((student, i) => (
              <Grid
                key={i}
                xs={12}
                md={4}
                lg={3}
                sx={{
                  m: "10px",
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: "4px",
                  boxShadow: "md",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Typography level="h4" component="h4">
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Link to={`/teacher/studentDetails/${student._id}`}>
                    <Button>View Student Info</Button>
                  </Link>
                  <Typography level="body1" component="p">
                    <b>Instrument:</b> {student.instrument}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid> */}
      </Box>
    </Sheet>
  );
};

export default StudentDatabase;
