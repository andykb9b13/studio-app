import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import CongratsModalContent from "../../../common/Modal/CongratsModalContent";
import CongratsModal from "../../../common/Modal/CongratsModal";
import Confetti from "react-confetti";
import Auth from "../../../../utils/auth";

const AssignmentContainer = ({
  assignment,
  onDelete,
  assignments,
  setAssignments,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteAssignment, { error }] = useMutation(DELETE_ASSIGNMENT);
  const [completeAssignment] = useMutation(COMPLETE_ASSIGNMENT);
  const [checked, setChecked] = useState(assignment.completed);
  const [completedOpen, setCompletedOpen] = useState(false);

  const deleteAssignmentFunc = async () => {
    try {
      await deleteAssignment({
        variables: {
          assignmentId: assignment._id,
        },
      });
      alert("Assignment Deleted");
      setOpen(false);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Could note delete assignment");
    }
  };

  const handleCompleteAssignment = async (checked) => {
    try {
      const { data } = await completeAssignment({
        variables: {
          assignmentId: assignment._id,
          completed: checked,
        },
      });
      if (checked === true) {
        setCompletedOpen(true);
      }
    } catch (err) {
      console.error(error);
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
          maxWidth: "100%",
          mx: "auto",
          overflow: "auto",
          resize: "vertical",
        }}
      >
        {/* Modal for displaying the delete prompt */}
        {Auth.teacherLoggedIn() && (
          <RegularModal
            name="deleteAssignment"
            open={open}
            onRequestClose={() => setOpen(false)}
          >
            <DeleteModalContent
              onRequestClose={() => setOpen(false)}
              confirmAction={() => deleteAssignmentFunc()}
              resourceName="Assignment"
            />
          </RegularModal>
        )}

        {/* Pop up modal for when an assignment is marked completed */}
        <CongratsModal
          completedOpen={completedOpen}
          close={() => setCompletedOpen(false)}
        >
          <CongratsModalContent
            close={() => setCompletedOpen(false)}
            resourceName={assignment.exerciseName}
            points={assignment.pointsWorth}
          />
          <Confetti />
        </CongratsModal>
        {Auth.teacherLoggedIn() && (
          <IconButton color="danger" onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        )}

        <IconButton>
          <EditIcon />
        </IconButton>
        <CardContent>
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
            <b>Special Notes:</b> {assignment.specialNotes}
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
        </CardContent>
        <CardActions>
          <Button component={Link} to="/student/:id/streakPractice">
            Start a Streak
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AssignmentContainer;
