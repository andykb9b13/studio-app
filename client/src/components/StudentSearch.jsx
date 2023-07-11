import React from "react";
import { Card, Input, Typography, Select, Option, Button } from "@mui/joy";

const StudentSearch = () => {
  return (
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
  );
};

export default StudentSearch;
