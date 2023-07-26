import React, { useState } from "react";
import { Card, Input, Typography, Select, Option } from "@mui/joy";

const StudentSearch = ({ students, setStudentSearch }) => {
  const [searchParam, setSearchParam] = useState(0);

  // sets the search parameter when it is changed
  const handleChange = (event, newValue) => {
    setSearchParam(newValue);
  };

  // Does the actual searching
  const handleSearch = (event) => {
    const { value } = event.target;
    let myStudents = [];
    // Switch cases to search using different parameters
    switch (searchParam) {
      case 0:
        myStudents = students.filter((student) =>
          student.firstName.toLowerCase().includes(value.toLowerCase())
        );
        setStudentSearch(myStudents);
        break;
      case 1:
        myStudents = students.filter((student) =>
          student.lastName.toLowerCase().includes(value.toLowerCase())
        );
        setStudentSearch(myStudents);
        break;
      case 2:
        myStudents = students.filter((student) => student.grade === value);
        setStudentSearch(myStudents);
        break;
      case 3:
        myStudents = students.filter((student) =>
          student.instrument.toLowerCase().includes(value.toLowerCase())
        );
        setStudentSearch(myStudents);
        break;
      case 4:
        myStudents = students.filter((student) =>
          student.lessonDay.toLowerCase().includes(value.toLowerCase())
        );
        setStudentSearch(myStudents);
        break;
      default:
        myStudents = students.filter((student) =>
          student.firstName.toLowerCase().includes(value.toLowerCase())
        );
        setStudentSearch(myStudents);
    }
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
      <Select
        name="searchParam"
        id="searchParam"
        defaultValue={0}
        onChange={handleChange}
      >
        <Option value={0}>First Name</Option>
        <Option value={1}>Last Name</Option>
        <Option value={2}>Grade</Option>
        <Option value={3}>Instrument</Option>
        <Option value={4}>Lesson Day</Option>
      </Select>
    </Card>
  );
};

export default StudentSearch;
