import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Sheet, Typography, IconButton, Button } from "@mui/joy";
import { DELETE_PRACTICE_PLAN } from "../../../utils/mutations";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import CreateAssignmentContainer from "./Assignments/CreateAssignmentContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import PracticePlanTable from "./PracticePlanTable";
import CreateResourceContainer from "./Resources/CreateResourceContainer";
import ResourceContainer from "./Resources/ResourceContainer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import Auth from "../../../utils/auth";

const styles = {
  sheet: {
    mt: 3,
    p: 2,
    backgroundColor: "lavender",
    borderRadius: "4px",
    boxShadow: "md",
  },
};

// The card of an individual practice plan
const PracticePlanCard = ({ practicePlan, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [deletePracticePlan, { error }] = useMutation(DELETE_PRACTICE_PLAN);
  const [assignments, setAssignments] = useState(practicePlan.assignments);
  const [planPoints, setPlanPoints] = useState(0);
  const [completedPoints, setCompletedPoints] = useState(0);
  const [resources, setResources] = useState(practicePlan.resources);
  const [revealed, setRevealed] = useState(false);

  // Setting the total points available to earn for the plan
  useEffect(() => {
    if (assignments !== undefined) {
      const pointsArr = assignments.map((assignment) => assignment.pointsWorth);
      const total = pointsArr.reduce((acc, curr) => acc + curr, 0);
      setPlanPoints(total);
    }
  }, [assignments]);

  // Setting the amount of completed points a student has earned by completing assignments
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

  // Setting the assignments
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
          Auth.teacherLoggedIn() && (
            <>
              <IconButton onClick={() => setOpen(true)} color="danger">
                <DeleteIcon />
              </IconButton>
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
            </>
          )
        }
      >
        {practicePlan.name}
      </Typography>

      <Typography level="h4">Plan Points: {planPoints}</Typography>
      <Typography level="h4">Points Earned: {completedPoints}</Typography>
      <Typography level="body1">{practicePlan.planNotes}</Typography>
      {!revealed ? (
        <KeyboardArrowDownIcon
          fontSize="large"
          onClick={() => setRevealed(true)}
        />
      ) : (
        <KeyboardControlKeyIcon
          fontSize="large"
          onClick={() => setRevealed(false)}
        />
      )}

      {revealed && (
        <>
          {/* Container for creating an assignment */}
          <CreateAssignmentContainer
            practicePlan={practicePlan}
            assignments={assignments}
            setAssignments={setAssignments}
            resources={resources}
            setResources={setResources}
          />

          {/* Container for creating a resource */}
          <CreateResourceContainer
            practicePlan={practicePlan}
            resources={resources}
            setResources={setResources}
          />

          {/* Table displaying list of all practice plans */}
          <PracticePlanTable
            assignments={assignments}
            setAssignments={setAssignments}
          />

          <ResourceContainer
            practicePlan={practicePlan}
            resources={resources}
            setResources={setResources}
          />
        </>
      )}
    </Sheet>
  );
};

export default PracticePlanCard;
