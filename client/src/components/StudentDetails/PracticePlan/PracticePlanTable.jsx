import React, { useState, useContext } from "react";
import AssignmentContainer from "./Assignments/AssignmentContainer";
import { Table, Button } from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";
import { MobileContext } from "../../../App";
import CongratsModal from "../../common/Modal/CongratsModal";
import CongratsModalContent from "../../common/Modal/CongratsModalContent";

// Table for displaying assignments in the practice plan
const PracticePlanTable = ({ assignments, setAssignments }) => {
  const [index, setIndex] = useState(); // index of the assignment to be viewed
  const { isMobile } = useContext(MobileContext); // check to see if the user is on mobile
  const [completedOpen, setCompletedOpen] = useState(false); // for congrats modal

  // delete assignment from the practice plan
  const handleDeleteAssignment = (deletedAssignmentId) => {
    setAssignments(
      assignments.filter((assignment) => assignment._id !== deletedAssignmentId)
    );
  };

  return (
    <Table id="practicePlanTable">
      <thead>
        <tr>
          <th>Name</th>
          {!isMobile && <th>Type</th>}
          {!isMobile && <th>Source</th>}
          <th>Points</th>
          <th>Completed</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {assignments &&
          assignments?.map((assignment) => (
            <React.Fragment key={assignment._id}>
              <tr
                style={
                  assignment.completed ? { color: "green" } : { color: "red" }
                }
              >
                <td>
                  <b>{assignment.exerciseName}</b>
                </td>
                {!isMobile && <td>{assignment.assignmentType}</td>}
                {!isMobile && <td>{assignment.source}</td>}
                <td>{assignment.pointsWorth}</td>
                <td>{assignment.completed ? "Yes" : "No"}</td>
                <td>
                  {/* Modal for viewing the assignment */}
                  <RegularModal
                    name="View Assignment"
                    open={index === assignment._id}
                    onRequestClose={() => setIndex(null)}
                    key={assignment._id}
                  >
                    <AssignmentContainer
                      onRequestClose={() => setIndex(null)}
                      setCompletedOpen={setCompletedOpen}
                      assignment={assignment}
                      assignments={assignments}
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
              {/* Pop up modal for when an assignment is marked completed */}
              <CongratsModal
                completedOpen={completedOpen}
                close={() => {
                  setCompletedOpen(false);
                }}
              >
                <CongratsModalContent
                  close={() => setCompletedOpen(false)}
                  resourceName={assignment.exerciseName}
                  points={assignment.pointsWorth}
                />
              </CongratsModal>
            </React.Fragment>
          ))}
      </tbody>
    </Table>
  );
};

export default PracticePlanTable;
