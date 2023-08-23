import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, IconButton, Card, Link } from "@mui/joy";
import { DELETE_PRACTICE_PLAN } from "../../../utils/mutations";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import CreateAssignmentContainer from "./Assignments/CreateAssignmentContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import PracticePlanTable from "./PracticePlanTable";
import CreateResourceContainer from "../PracticePlan/Assignments/CreateResourceContainer";

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
const PracticePlanCard = ({
  practicePlan,
  onDelete,
  totalPlanPoints,
  setTotalPlanPoints,
}) => {
  const [open, setOpen] = useState(false);
  const [deletePracticePlan, { error }] = useMutation(DELETE_PRACTICE_PLAN);
  const [assignments, setAssignments] = useState(practicePlan.assignments);
  const [planPoints, setPlanPoints] = useState(0);
  const [completedPoints, setCompletedPoints] = useState(0);

  useEffect(() => {
    if (assignments !== undefined) {
      const pointsArr = assignments.map((assignment) => assignment.pointsWorth);
      const total = pointsArr.reduce((acc, curr) => acc + curr, 0);
      console.log(total);
      setPlanPoints(total);
    }
  }, [assignments]);

  useEffect(() => {
    if (assignments !== undefined) {
      const completedAssignments = assignments.filter(
        (assignment) => assignment.completed === true
      );
      const pointsArr = completedAssignments.map(
        (assignment) => assignment.pointsWorth
      );
      const total = pointsArr.reduce((acc, curr) => acc + curr, 0);
      setCompletedPoints(total);
    }
  }, [assignments]);

  useEffect(() => {
    setAssignments(assignments || []);
  }, [assignments]);

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

  return (
    <Sheet sx={styles.sheet}>
      <Typography
        level="h2"
        endDecorator={
          <IconButton onClick={() => setOpen(true)} color="danger">
            <DeleteIcon />
          </IconButton>
        }
      >
        {practicePlan.name}
      </Typography>

      <Typography level="h4">Plan Points: {planPoints}</Typography>
      <Typography level="h4">Points Earned: {completedPoints}</Typography>
      <Typography level="body1">{practicePlan.planNotes}</Typography>

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

      {/* Container for creating an assignment */}
      <CreateAssignmentContainer
        practicePlan={practicePlan}
        assignments={assignments}
        setAssignments={setAssignments}
      />

      {/* Container for creating a resource */}
      <CreateResourceContainer practicePlan={practicePlan} />

      {/* Table displaying list of all practice plans */}
      <PracticePlanTable
        assignments={assignments}
        setAssignments={setAssignments}
      />
      <Card>
        <Typography level="h3">Resource Links</Typography>
        {practicePlan.resources?.map((resource) => (
          <React.Fragment key={resource._id}>
            <Link href={resource.url} alt="resource url">
              {resource.resourceName}
            </Link>
            <Typography>{resource.description}</Typography>
            {/* <RegularModal>
              <DeleteModalContent />
            </RegularModal> */}
          </React.Fragment>
        ))}
      </Card>
    </Sheet>
  );
};

export default PracticePlanCard;
