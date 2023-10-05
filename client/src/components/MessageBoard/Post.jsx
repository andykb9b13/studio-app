import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Typography,
  CardContent,
  IconButton,
  CardOverflow,
  AspectRatio,
} from "@mui/joy";
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
import { MobileContext } from "../../App";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import * as DOMPurify from "dompurify";

const Post = ({ post, deletePostFunc }) => {
  const { teacher } = useTeacherContext();
  const { student } = useStudentContext();
  const { isMobile } = useContext(MobileContext);
  const [comments, setComments] = useState();
  const [open, setOpen] = useState(false);
  const [createComment, { error }] = useMutation(ADD_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [authorId, setAuthorId] = useState();
  const [isTeacher, setIsTeacher] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

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

  const cleanMessage = DOMPurify.sanitize(post.message);

  return (
    <Card sx={styles.sheet}>
      {post.url && (
        <CardOverflow>
          <AspectRatio ratio={isMobile ? 1 : 3}>
            <img src={post.url} alt="title" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      )}
      <CardContent>
        <Typography
          level="h2"
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

        <div dangerouslySetInnerHTML={{ __html: cleanMessage }} />

        <CreateComment
          onRequestClose={() => setOpen(false)}
          createCommentFunc={createCommentFunc}
        />
        <Typography
          level="h4"
          endDecorator={
            comments?.length > 0 && <Typography>({comments.length})</Typography>
          }
        >
          Comments
        </Typography>
        {commentOpen ? (
          <>
            <KeyboardArrowUp onClick={() => setCommentOpen(false)} />
            {comments?.length < 1 && <Typography>No Comments</Typography>}
            {comments?.map((comment) => (
              <Comment
                createCommentFunc={createCommentFunc}
                comment={comment}
                key={comment._id}
                deleteCommentFunc={deleteCommentFunc}
              />
            ))}
          </>
        ) : (
          <KeyboardArrowDown onClick={() => setCommentOpen(true)} />
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
