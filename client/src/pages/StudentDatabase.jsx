import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_TEACHER } from "../utils/queries";
import CreateStudent from "../components/CreateStudent";
import {
  Sheet,
  Box,
  Button,
  Typography,
  Input,
  Modal,
  ModalDialog,
  ModalClose,
} from "@mui/joy";

const StudentDatabase = () => {
  // getting the students using StudentContext.jsx

  const { id } = useParams();
  const { data } = useQuery(QUERY_TEACHER, {
    variables: {
      teacherId: id,
    },
  });
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClick = (event) => {
    setClicked(!clicked);
  };

  const students = data?.teacher.students || [];

  return (
    <Sheet>
      <Typography level="h2" component="h2">
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
          <Typography level="h3" component="h3">
            Studio Info
          </Typography>
          <Button
            onClick={() => {
              handleClick();
              setOpen(true);
            }}
          >
            Add Student
          </Button>
        </Box>

        {clicked ? <CreateStudent teacherId={id} /> : ""}

        {students &&
          students.map((student, i) => (
            <Box
              key={i}
              sx={{
                m: "10px",
                p: 2,
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: "md",
              }}
            >
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
          ))}
      </Box>
    </Sheet>
  );
};

export default StudentDatabase;
