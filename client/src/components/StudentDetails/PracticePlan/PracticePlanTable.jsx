import React, { useState, useContext } from "react";
import AssignmentContainer from "./Assignments/AssignmentContainer";
import { Table, Button } from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";
import { MobileContext } from "../../../App";

const PracticePlanTable = ({ assignments, setAssignments }) => {
  const [index, setIndex] = useState();
  const { isMobile } = useContext(MobileContext);
  const [assignment, setAssignment] = useState();

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
          {!isMobile && <th>Metronome</th>}
          {!isMobile && <th>Source</th>}
          <th>Points</th>
          <th>Completed</th>
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
                {!isMobile && <td>{assignment.metronome}</td>}
                {!isMobile && <td>{assignment.source}</td>}
                <td>{assignment.pointsWorth}</td>
                <td>{assignment.completed ? "Yes" : "No"}</td>
                <td>
                  <RegularModal
                    name="View Assignment"
                    open={index === assignment._id}
                    onRequestClose={() => setIndex(null)}
                    key={assignment._id}
                    onClick={() => setAssignment(assignment)}
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
