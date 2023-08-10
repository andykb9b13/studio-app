import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
  Button,
  CardActions,
  Modal,
  ModalClose,
  Sheet,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AssignmentView = ({ assignment }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        View
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
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
            <IconButton color="danger">
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <CardContent>
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
            </CardContent>
            <CardActions>
              <Link to="/student/:id/streakPractice">
                <Button>Start a Streak</Button>
              </Link>
            </CardActions>
          </Card>
        </Sheet>
      </Modal>
    </div>
  );
};

export default AssignmentView;
