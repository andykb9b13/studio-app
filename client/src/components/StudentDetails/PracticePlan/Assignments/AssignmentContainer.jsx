import React, { useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
  Button,
  CardActions,
  Switch,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModalContent from "../../../common/Modal/DeleteModalContent";
import RegularModal from "../../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import { DELETE_ASSIGNMENT } from "../../../../utils/mutations";
import { COMPLETE_ASSIGNMENT } from "../../../../utils/mutations";
import { EDIT_ASSIGNMENT } from "../../../../utils/mutations";
import Auth from "../../../../utils/auth";
import EditAssignment from "./EditAssignment";
import StreakPractice from "../../../PracticeHub/StreakPractice";

const AssignmentContainer = ({
  assignment,
  onDelete,
  assignments,
  setAssignments,
  setCompletedOpen,
}) => {
  const [open, setOpen] = useState(null);
  const [streakOpen, setStreakOpen] = useState(false);
  const [deleteAssignment] = useMutation(DELETE_ASSIGNMENT);
  const [completeAssignment] = useMutation(COMPLETE_ASSIGNMENT);
  const [editAssignment] = useMutation(EDIT_ASSIGNMENT);
  const [checked, setChecked] = useState(assignment.completed);

  const editAssignmentFunc = async (userInput) => {
    const assignmentId = assignment._id;
    try {
      const editedAssignment = await editAssignment({
        variables: {
          assignmentId: assignment?._id,
          pointsWorth: parseInt(userInput.points),
          ...userInput,
        },
      });
      const filteredArr = assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
      setAssignments([...filteredArr, editedAssignment.data.editAssignment]);
      setOpen(null);
      alert("Assignment successfully edited!");
    } catch (err) {
      console.error(err);
      setOpen(null);
      alert("Could not edit assignment");
    }
  };

  const deleteAssignmentFunc = async () => {
    try {
      await deleteAssignment({
        variables: {
          assignmentId: assignment._id,
        },
      });
      alert("Assignment Deleted");
      setOpen(null);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Could note delete assignment");
    }
  };

  const handleCompleteAssignment = async (checked, assignmentId) => {
    console.log(checked, assignmentId);
    try {
      const editedAssignment = await completeAssignment({
        variables: {
          assignmentId: assignmentId,
          completed: checked,
        },
      });
      if (checked === true) {
        setCompletedOpen(true);
      }
      const filteredArr = assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
      setAssignments([
        ...filteredArr,
        editedAssignment.data.completeAssignment,
      ]);
    } catch (err) {
      console.error(err);
      alert("could not edit assignment");
    }
  };

  return (
    <>
      <Typography
        component="h2"
        id="modal-title"
        level="h4"
        textColor="inherit"
        fontWeight="lg"
        mb={1}
      >
        {assignment.exerciseName}
      </Typography>
      <Card
        sx={{
          mt: 2,
          boxShadow: "md",
          maxHeight: "max-content",
          width: "500px",
          maxWidth: "100%",
          mx: "auto",
          overflow: "auto",
          resize: "vertical",
          whiteSpace: "pre-line",
          backgroundColor: "lightblue",
        }}
      >
        {/* Modal for displaying the delete prompt */}
        {Auth.teacherLoggedIn() && (
          <>
            <RegularModal
              name="deleteAssignment"
              open={open === "delete"}
              onRequestClose={() => setOpen(null)}
            >
              <DeleteModalContent
                onRequestClose={() => setOpen(null)}
                confirmAction={() => deleteAssignmentFunc()}
                resourceName="Assignment"
              />
            </RegularModal>
            <RegularModal
              name="editAssignment"
              onRequestClose={() => setOpen(null)}
              open={open === "edit"}
            >
              <EditAssignment
                editAssignmentFunc={editAssignmentFunc}
                assignment={assignment}
                setAssignments={setAssignments}
                assignments={assignments}
                setOpen={setOpen}
              />
            </RegularModal>
          </>
        )}

        <CardContent>
          <Card sx={{ marginBottom: "10px" }}>
            <Typography level="h4">
              <b>Goal:</b> {assignment.goal}
            </Typography>
          </Card>
          <Card sx={{ marginBottom: "10px" }}>
            <Typography>
              <b>Special Notes:</b> {assignment.specialNotes}
            </Typography>
          </Card>
          <Card>
            <Typography>
              <b>Points: {assignment.pointsWorth}</b>
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
              <b>Points Worth:</b> {assignment.pointsWorth}
            </Typography>

            <Typography>
              <b>Completed?</b> {checked ? "Yes" : "No"}
            </Typography>

            <Switch
              checked={checked}
              color={checked ? "success" : "danger"}
              onChange={(event) => {
                const newChecked = event.target.checked;
                setChecked(newChecked);
                handleCompleteAssignment(newChecked, assignment._id);
              }}
            />
          </Card>
        </CardContent>

        {Auth.teacherLoggedIn() && (
          <>
            <IconButton color="danger" onClick={() => setOpen("delete")}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setOpen("edit")}>
              <EditIcon />
            </IconButton>
          </>
        )}
        {streakOpen && (
          <StreakPractice
            assignmentExerciseName={assignment.exerciseName}
            tempo={assignment.metronome}
          />
        )}
        <CardActions>
          <Button onClick={() => setStreakOpen(!streakOpen)}>
            {streakOpen ? "Close" : "Start a Streak"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AssignmentContainer;
