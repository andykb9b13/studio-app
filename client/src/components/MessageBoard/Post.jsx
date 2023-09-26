import React, { useEffect, useState } from "react";
import { Card, Typography, CardContent, CardActions, Button } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import dateService from "../../utils/dates";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import RegularModal from "../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { useTeacherContext } from "../../utils/Context";
import { useStudentContext } from "../../utils/Context";
import Auth from "../../utils/auth";

const Post = ({ post }) => {
  const { teacher } = useTeacherContext();
  const { student } = useStudentContext();
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(false);
  const [createComment, { error }] = useMutation(ADD_COMMENT);
  const [authorId, setAuthorId] = useState(teacher._id);

  useEffect(() => {
    setComments([post.comments]);
  }, [setComments, post]);

  const createCommentFunc = async (userInput) => {
    const createdAt = new Date();
    let isTeacher = true;

    if (!Auth.teacherLoggedIn()) {
      setAuthorId(student._id);
      isTeacher = false;
    }
    console.log(userInput);
    try {
      const { data } = await createComment({
        variables: {
          message: userInput.message,
          createdAt: createdAt,
          authorId: authorId,
          isTeacher: isTeacher,
          postId: post._id,
        },
      });
      setOpen(false);
      setComments([...comments, data.addComment]);
      alert("Comment created!");
    } catch (err) {
      alert("Could not create comment");
      console.error(err);
    }
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography level="h3">{post.title}</Typography>
        <Typography level="body2">Created on: {post.createdAt}</Typography>
        <Typography>{post.message}</Typography>
        <Typography level="h4">Comments</Typography>
        {post.comments?.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </CardContent>
      <CardActions>
        <RegularModal open={open} onRequestClose={() => setOpen(false)}>
          <CreateComment
            onRequestClose={() => setOpen(false)}
            createCommentFunc={createCommentFunc}
          />
        </RegularModal>
        <Button onClick={() => setOpen(true)}>Comment</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
