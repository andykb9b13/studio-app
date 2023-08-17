import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, IconButton, Table } from "@mui/joy";
import { Add } from "@mui/icons-material";
import { DELETE_PRACTICE_PLAN } from "../../../utils/mutations";
import AssignmentView from "./Assignments/AssignmentView";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import CreateAssignmentContainer from "./Assignments/CreateAssignmentContainer";
import CreateAssignment from "./Assignments/CreateAssignment";
import DeleteIcon from "@mui/icons-material/Delete";

const styles = {
  sheet: {
    mt: 3,
    p: 2,
    backgroundColor: "lavender",
    borderRadius: "4px",
    boxShadow: "md",
  },
};

// The view of an individual practice plan
const PracticePlanCard = ({ practicePlan, onDelete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [deletePracticePlan, { error }] = useMutation(DELETE_PRACTICE_PLAN);
  const [assignments, setAssignments] = useState(practicePlan.assignments);

  const deletePracticePlanFunc = async () => {
    try {
      await deletePracticePlan({
        variables: { planId: practicePlan._id },
      });
      alert("Plan Deleted!");
      setOpen(false);
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setAssignments(assignments || []);
  }, [assignments]);

  return (
    <Sheet sx={styles.sheet}>
      <Typography level="h2">{practicePlan.name}</Typography>
      <IconButton onClick={() => setActiveIndex(1)}>
        <Add />
      </IconButton>

      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <DeleteModalContent
          onRequestClose={() => setOpen(false)}
          confirmAction={() => deletePracticePlanFunc()}
          resourceName="Practice Plan"
        />
      </RegularModal>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>

      <CreateAssignmentContainer
        practicePlan={practicePlan}
        assignments={assignments}
        setAssignments={setAssignments}
      />

      {activeIndex === 1 ? <CreateAssignment planId={practicePlan._id} /> : ""}

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
                    <AssignmentView
                      assignment={assignment}
                      key={assignment._id}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default PracticePlanCard;
