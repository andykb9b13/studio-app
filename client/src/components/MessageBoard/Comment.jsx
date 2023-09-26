import React from "react";
import { Typography, Card } from "@mui/joy";

const Comment = ({ comment }) => {
  return (
    <Card>
      <Typography>By: {comment.authorId}</Typography>
      <Typography>{comment.message}</Typography>
    </Card>
  );
};

export default Comment;
