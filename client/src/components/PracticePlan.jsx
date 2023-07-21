import React, { useState } from "react";
import CreateAssignment from "./CreateAssignment";
import DeletePracticePlanModal from "./DeletePracticePlanModal";
import { Sheet, Typography, IconButton, Divider, Link, Table } from "@mui/joy";
import { Add } from "@mui/icons-material";
import AssignmentView from "./AssignmentView";

const PracticePlan = ({ practicePlan, studentId }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      <Typography level="h2">{practicePlan.name}</Typography>
      <IconButton onClick={() => setActiveIndex(1)}>
        <Add />
      </IconButton>
      <DeletePracticePlanModal planId={practicePlan._id} />

      {activeIndex === 1 ? (
        <CreateAssignment studentId={studentId} planId={practicePlan._id} />
      ) : (
        ""
      )}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Metronome</th>
            <th>Source</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {practicePlan.assignments &&
            practicePlan.assignments.map((assignment) => (
              <>
                <tr key={assignment._id}>
                  <td>
                    <b>{assignment.exerciseName}</b>
                  </td>
                  <td>{assignment.metronome}</td>
                  <td>{assignment.source}</td>
                  <td>
                    <AssignmentView
                      assignment={assignment}
                      key={assignment._id}
                    />
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default PracticePlan;
