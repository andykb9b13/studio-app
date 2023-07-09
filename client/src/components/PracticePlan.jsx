import React, { useState } from "react";
import CreateAssignment from "./CreateAssignment";
import { Sheet, Box, Button, Typography } from "@mui/joy";

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
      <Button onClick={handleClick}>Create An Assignment for This Plan</Button>
      {clicked ? (
        <CreateAssignment studentId={studentId} planId={practicePlan._id} />
      ) : (
        ""
      )}

      {practicePlan.assignments &&
        practicePlan.assignments.map((assignment, i) => (
          <Box key={i}>
            <Typography level="h4">
              <b>Exercise Name:</b> {assignment.exerciseName}
            </Typography>
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
          </Box>
        ))}
    </Sheet>
  );
};

export default PracticePlan;
