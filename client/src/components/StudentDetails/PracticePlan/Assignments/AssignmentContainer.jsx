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

const AssignmentContainer = ({ assignment, onDelete, checked, setChecked }) => {
  const [open, setOpen] = useState(false);
  const [deleteAssignment, { error }] = useMutation(DELETE_ASSIGNMENT);
  const [completeAssignment] = useMutation(COMPLETE_ASSIGNMENT);

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
      alert("That's great! Way to go!");
      console.log(data);
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
      <Card sx={{ mt: 2 }}>
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
        <IconButton color="danger" onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
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
            <b>Completed?</b>
          </Typography>
          <Switch
            checked={checked}
            onChange={(event) => {
              const newChecked = event.target.checked;
              setChecked(newChecked);
              handleCompleteAssignment(newChecked);
            }}
          />
        </CardContent>
        <CardActions>
          <Button compoent={Link} to="/student/:id/streakPractice">
            Start a Streak
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AssignmentContainer;
