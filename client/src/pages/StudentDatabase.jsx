import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import CreateStudent from "../components/CreateStudent";
import {
  Sheet,
  Card,
  Button,
  Typography,
  Input,
  Table,
  Select,
  Option,
} from "@mui/joy";

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
      <Card
        sx={{
          width: "75%",
          mx: "auto",
          backgroundColor: "lightblue",
          borderRadius: "4px",
          boxShadow: "lg",
          p: 4,
        }}
      >
        <Sheet
          color="neutral"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            px: 20,
            backgroundColor: "transparent",
          }}
        >
          <Typography
            level="h2"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Studio Info
          </Typography>
          <Card>
            <Input
              type="text"
              name="studentSearch"
              id="studentSearch"
              placeholder="Search for a student"
              sx={{ my: 2 }}
            />
            <Typography level="body1">Search By: </Typography>
            <Select defaultValue="firstName">
              <Option value="firstName">First Name</Option>
              <Option value="lastName">Last Name</Option>
              <Option value="grade">Grade</Option>
              <Option value="instrument">Instrument</Option>
              <Option value="status">Status</Option>
              <Option value="lessonDay">Lesson Day</Option>
            </Select>
            <Button>Search</Button>
          </Card>
        </Sheet>

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
        <Button
          onClick={() => {
            handleClick();
          }}
          sx={{ my: 2 }}
        >
          {clicked ? "Cancel" : "Add Student"}
        </Button>
      </Card>
    </Sheet>
  );
};

export default StudentDatabase;
