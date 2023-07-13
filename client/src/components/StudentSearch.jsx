import React, { useState, useMemo } from "react";
import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
  CardContent,
} from "@mui/joy";

const StudentSearch = ({ students, setStudentSearch }) => {
  console.log(students);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    const myStudents = students.filter((student) =>
      student.firstName.toLowerCase().includes(value.toLowerCase())
    );
    setStudentSearch(myStudents);
  };

  return (
    <Card>
      <Input
        type="text"
        name="studentSearch"
        id="studentSearch"
        placeholder="Search for a student"
        onChange={handleSearch}
        sx={{ my: 2 }}
      />
      <Typography level="body1">Search By: </Typography>
      <Select name="searchParam" id="searchParam" defaultValue="firstName">
        <Option value="firstName">First Name</Option>
        <Option value="lastName">Last Name</Option>
        <Option value="grade">Grade</Option>
        <Option value="instrument">Instrument</Option>
        <Option value="status">Status</Option>
        <Option value="lessonDay">Lesson Day</Option>
      </Select>
    </Card>
  );
};

export default StudentSearch;
