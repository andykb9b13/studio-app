import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import CreateStudent from "../components/CreateStudent";
import StudentDatabaseTable from "../components/StudentDatabaseTable";
import StudentSearch from "../components/StudentSearch";
import { Sheet, Card, Button, Typography } from "@mui/joy";

const StudentDatabase = () => {
  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });
  const students = data?.teacher.students || [];
  const [clicked, setClicked] = useState(false);
  const [studentSearch, setStudentSearch] = useState(students);

  const handleClick = (event) => {
    setClicked(!clicked);
  };

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
          <Link to={`/teacher/${id}`}>
            <Button>Back to Dashboard</Button>
          </Link>
        </Sheet>
        <StudentSearch
          students={students}
          studentSearch={studentSearch}
          setStudentSearch={setStudentSearch}
        />
        <StudentDatabaseTable students={studentSearch} />
        <Button
          onClick={() => {
            handleClick();
          }}
          sx={{ my: 2 }}
        >
          {clicked ? "Cancel" : "Add Student"}
        </Button>
        {clicked ? <CreateStudent teacherId={id} /> : ""}
      </Card>
    </Sheet>
  );
};

export default StudentDatabase;
