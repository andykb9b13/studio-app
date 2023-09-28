import React, { useEffect, useState } from "react";
import { Card, Typography, CardContent, IconButton } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import RegularModal from "../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, DELETE_COMMENT } from "../../utils/mutations";
import { useTeacherContext } from "../../utils/Context";
import { useStudentContext } from "../../utils/Context";
import Auth from "../../utils/auth";
import Delete from "@mui/icons-material/Delete";
import DeleteModalContent from "../common/Modal/DeleteModalContent";
import dateService from "../../utils/dates";

const Post = ({ post, deletePostFunc }) => {
  const { teacher } = useTeacherContext();
  const { student } = useStudentContext();
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(false);
  const [createComment, { error }] = useMutation(ADD_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [authorId, setAuthorId] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setComments(post.comments);
  }, [setComments, post]);

  useEffect(() => {
    if (Auth.teacherLoggedIn()) {
      setAuthorId(teacher._id);
      setIsTeacher(true);
    } else {
      setAuthorId(student._id);
    }
  }, []);

  const createCommentFunc = async (userInput) => {
    const createdAt = new Date();
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

  const deleteCommentFunc = async (commentId) => {
    try {
      console.log(commentId);

      const deletedComment = await deleteComment({
        variables: {
          commentId: commentId,
        },
      });
      setComments(
        comments.filter((comment) => comment._id !== deletedComment._id)
      );
      alert("Comment deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={styles.sheet}>
      <CardContent>
        <Typography
          level="h3"
          endDecorator={
            Auth.teacherLoggedIn() && (
              <>
                <RegularModal
                  open={deleteModalOpen}
                  onRequestClose={() => setDeleteModalOpen(false)}
                >
                  <DeleteModalContent
                    resourceName={" '" + post.title + "' "}
                    confirmAction={() => deletePostFunc(post._id)}
                    onRequestClose={() => setDeleteModalOpen(false)}
                  />
                </RegularModal>
                <IconButton color="danger">
                  <Delete onClick={() => setDeleteModalOpen(true)} />
                </IconButton>
              </>
            )
          }
        >
          {post.title}
        </Typography>
        <Typography level="body2">
          Created on: {dateService.formatDate(post.createdAt)}
        </Typography>
        <Typography level="body2">
          By: {post.authorId.firstName} {post.authorId.lastName}
        </Typography>
        <Typography>{post.message}</Typography>
        <Typography level="h4">Comments</Typography>
        {comments?.map((comment) => (
          <Comment
            createCommentFunc={createCommentFunc}
            comment={comment}
            key={comment._id}
            deleteCommentFunc={deleteCommentFunc}
          />
        ))}
      </CardContent>

      <CreateComment
        onRequestClose={() => setOpen(false)}
        createCommentFunc={createCommentFunc}
      />
    </Card>
  );
};

export default Post;
