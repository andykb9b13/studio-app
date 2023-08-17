import React, { useState } from "react";
import AssignmentContainer from "./Assignments/AssignmentContainer";
import { Table, Button } from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";

const PracticePlanTable = ({ assignments, setAssignments }) => {
  const [index, setIndex] = useState();

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
                    open={index === assignment._id}
                    onRequestClose={() => setIndex(null)}
                    key={assignment._id}
                  >
                    <AssignmentContainer
                      onRequestClose={() => setIndex(null)}
                      assignment={assignment}
                      setAssignments={setAssignments}
                      onDelete={() => handleDeleteAssignment(assignment._id)}
                      key={assignment._id}
                    />
                  </RegularModal>
                  <Button
                    variant="outlined"
                    onClick={() => setIndex(assignment._id)}
                  >
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
