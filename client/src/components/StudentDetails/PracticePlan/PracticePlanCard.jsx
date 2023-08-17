import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, IconButton } from "@mui/joy";
import { DELETE_PRACTICE_PLAN } from "../../../utils/mutations";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import CreateAssignmentContainer from "./Assignments/CreateAssignmentContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import PracticePlanTable from "./PracticePlanTable";

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
      {/* Modal for deleting a practice plan */}
      <RegularModal
        name="deletePracticePlan"
        open={open}
        onRequestClose={() => setOpen(false)}
      >
        <DeleteModalContent
          onRequestClose={() => setOpen(false)}
          confirmAction={() => deletePracticePlanFunc()}
          resourceName="Practice Plan"
        />
      </RegularModal>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>

      {/* Container for creating an assignment */}
      <CreateAssignmentContainer
        practicePlan={practicePlan}
        assignments={assignments}
        setAssignments={setAssignments}
      />

      {/* Table displaying list of all practice plans */}
      <PracticePlanTable
        assignments={assignments}
        setAssignments={setAssignments}
      />
    </Sheet>
  );
};

export default PracticePlanCard;
