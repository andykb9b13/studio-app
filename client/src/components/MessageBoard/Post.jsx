import React from "react";
import { Card, Typography, CardContent } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import dateService from "../../utils/dates";

const Post = ({ post }) => {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography level="h3">{post.title}</Typography>
        <Typography level="body2">Created on: {post.createdAt}</Typography>
        <Typography>{post.message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
