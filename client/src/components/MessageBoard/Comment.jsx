import React from "react";
import { Typography, Card, IconButton } from "@mui/joy";
import { useStudentContext } from "../../utils/Context";
import Auth from "../../utils/auth";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = ({ comment, deleteCommentFunc }) => {
  const { student } = useStudentContext();

  return (
    <Card sx={{ mt: 2 }}>
      <Typography>By: {comment.authorId}</Typography>
      {comment.authorId === student._id || Auth.teacherLoggedIn() ? (
        <IconButton color="danger">
          <DeleteIcon onClick={() => deleteCommentFunc(comment._id)} />
        </IconButton>
      ) : (
        ""
      )}
      <Typography>{comment.message}</Typography>
    </Card>
  );
};

export default Comment;
