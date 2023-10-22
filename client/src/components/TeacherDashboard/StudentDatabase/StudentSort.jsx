import React from "react";
import { Typography, Select, Option, Grid } from "@mui/joy";

// Component for sorting students based on specific parameters
const StudentSort = ({ setOrderedStudents, students }) => {
  // function for sorting students by first name
  const orderStudentsFirstName = (students) => {
    const firstNameArr = [];
    const orderedArr = [];
    students.forEach((student) => firstNameArr.push(student.firstName));
    firstNameArr.sort();
    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < students.length; j++) {
        if (students[j].firstName === firstNameArr[i]) {
          orderedArr.push(students[j]);
        }
      }
    }
    setOrderedStudents(orderedArr);
  };

  // function for sorting students by last name
  const orderStudentsLastName = (students) => {
    const lastNameArr = [];
    const orderedArr = [];
    students.forEach((student) => lastNameArr.push(student.lastName));
    lastNameArr.sort();
    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < students.length; j++) {
        if (students[j].lastName === lastNameArr[i]) {
          orderedArr.push(students[j]);
        }
      }
    }
    setOrderedStudents(orderedArr);
  };

  return (
    <Grid id="studentSortContainer" container justifyContent={"center"} mb={4}>
      <Grid xs={12} lg={4}>
        <Typography level="h4">Sort Students</Typography>
        <Select placeholder="Sort By...">
          <Option onClick={() => orderStudentsFirstName(students)}>
            First Name
          </Option>
          <Option onClick={() => orderStudentsLastName(students)}>
            Last Name
          </Option>
        </Select>
      </Grid>
    </Grid>
  );
};

export default StudentSort;
