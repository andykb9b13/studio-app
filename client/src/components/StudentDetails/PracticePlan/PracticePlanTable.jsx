import React, { useState } from "react";
import AssignmentContainer from "./Assignments/AssignmentContainer";
import { Table, Button } from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";

const PracticePlanTable = ({ assignments, setAssignments }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteAssignment = (deletedAssignmentId) => {
    setAssignments(
      assignments.filter((plan) => plan._id !== deletedAssignmentId)
    );
  };

  return (
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
        {assignments &&
          assignments.map((assignment) => (
            <React.Fragment key={assignment._id}>
              <tr>
                <td>
                  <b>{assignment.exerciseName}</b>
                </td>
                <td>{assignment.metronome}</td>
                <td>{assignment.source}</td>
                <td>
                  <RegularModal
                    name="View Assignment"
                    open={open}
                    onRequestClose={() => setOpen(false)}
                  >
                    <AssignmentContainer
                      onRequestClose={() => setOpen(false)}
                      assignment={assignment}
                      setAssignments={setAssignments}
                      onDelete={() => handleDeleteAssignment(assignment._id)}
                      key={assignment._id}
                    />
                  </RegularModal>
                  <Button variant="outlined" onClick={() => setOpen(true)}>
                    View
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
      </tbody>
    </Table>
  );
};

export default PracticePlanTable;
