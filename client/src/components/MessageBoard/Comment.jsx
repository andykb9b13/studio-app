import React from "react";
import { Typography, Card } from "@mui/joy";

const Comment = ({ comment }) => {
  return (
    <Card sx={{ mt: 2 }}>
      <Typography>By: {comment.authorId}</Typography>
      <Typography>{comment.message}</Typography>
    </Card>
  );
};

export default Comment;
