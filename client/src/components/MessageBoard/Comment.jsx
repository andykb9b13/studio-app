import React from "react";
import {
  Typography,
  Card,
  CardActions,
  IconButton,
  CardContent,
} from "@mui/joy";
import { useStudentContext } from "../../utils/Context";
import Auth from "../../utils/auth";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@apollo/client";
import { QUERY_AUTHOR } from "../../utils/queries";
import { avatarList } from "../common/Assets";
import CreateComment from "./CreateComment";

const Comment = ({ comment, deleteCommentFunc, createCommentFunc }) => {
  const { student } = useStudentContext();

  const { data } = useQuery(QUERY_AUTHOR, {
    variables: {
      authorId: comment.authorId,
      isTeacher: comment.isTeacher,
    },
  });

  console.log(data);

  return (
    <Card sx={{ mt: 2 }}>
      <Typography
        endDecorator={
          <>
            <img
              src={
                data?.author.avatarId
                  ? avatarList[data?.author.avatarId].name
                  : avatarList[0].name
              }
              alt="avatar"
              style={{ maxWidth: "50px" }}
            />
            {comment.authorId === student._id || Auth.teacherLoggedIn() ? (
              <IconButton color="danger">
                <DeleteIcon onClick={() => deleteCommentFunc(comment._id)} />
              </IconButton>
            ) : (
              ""
            )}
          </>
        }
      >
        <b>
          {data?.author.username ||
            data?.author.firstName + " " + data?.author.lastName}
        </b>
      </Typography>

      <CardContent>
        <Typography>{comment.message}</Typography>
      </CardContent>
      <CardActions>
        {/* <CreateComment createCommentFunc={createCommentFunc} /> */}
      </CardActions>
    </Card>
  );
};

export default Comment;
