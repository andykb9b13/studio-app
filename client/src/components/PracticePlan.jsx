import React, { useState } from "react";
import CreateAssignment from "./CreateAssignment";
import DeletePracticePlanModal from "./DeletePracticePlanModal";
import {
  Sheet,
  Card,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/joy";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

const PracticePlan = ({ practicePlan, studentId }) => {
  console.log("practicePlan", practicePlan);

  const [clicked, setClicked] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setClicked(!clicked);
  };

  return (
    <Sheet
      sx={{
        mt: 3,
        p: 2,
        backgroundColor: "lavender",
        borderRadius: "4px",
        boxShadow: "md",
      }}
    >
      <Typography level="h3">{practicePlan.name}</Typography>
      <IconButton onClick={handleClick}>
        <Add />
      </IconButton>
      <DeletePracticePlanModal planId={practicePlan._id} />

      {clicked ? (
        <CreateAssignment studentId={studentId} planId={practicePlan._id} />
      ) : (
        ""
      )}

      {practicePlan.assignments &&
        practicePlan.assignments.map((assignment, i) => (
          <Card key={i} sx={{ mt: 2 }}>
            <Typography
              level="h2"
              endDecorator={
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              }
            >
              {assignment.exerciseName}
            </Typography>
            <CardContent>
              <Typography>
                <b>Date:</b> {assignment.date}
              </Typography>
              <Typography>
                <b>Assignment Type:</b> {assignment.assignmentType}
              </Typography>
              <Typography>
                <b>Source:</b> {assignment.source}
              </Typography>
              <Typography>
                <b>Pages:</b> {assignment.pages}
              </Typography>
              <Typography>
                <b>Metronome:</b> {assignment.metronome}
              </Typography>
              <Typography>
                <b>Special Notes:</b> {assignment.specialNotes}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Sheet>
  );
};

export default PracticePlan;
