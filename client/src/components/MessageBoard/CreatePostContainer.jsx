import React, { useState } from "react";
import { Sheet, Button } from "@mui/joy";
import RegularModal from "../common/Modal/RegularModal";
import CreatePost from "./CreatePost";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { useStudentContext, useTeacherContext } from "../../utils/Context";
import Auth from "../../utils/auth";

const CreatePostContainer = ({ open, setOpen, posts, setPosts }) => {
  const { teacher } = useTeacherContext();
  const { student } = useStudentContext();
  const [createPost, { error }] = useMutation(ADD_POST);
  const [authorId, setAuthorId] = useState(teacher._id);

  const createPostFunc = async (userInput) => {
    const createdAt = new Date();
    let isTeacher = true;
    if (!Auth.teacherLoggedIn()) {
      setAuthorId(student._id);
      isTeacher = false;
    }
    try {
      const { data } = await createPost({
        variables: {
          studioId: teacher._id,
          title: userInput.title,
          message: userInput.message,
          url: userInput.url,
          createdAt: createdAt,
          authorId: authorId,
          isTeacher: isTeacher,
        },
      });
      setOpen(false);
      setPosts([...posts, data.addPost]);
      alert("Post created!");
    } catch (err) {
      alert("Could not create post");
      console.error(err);
    }
  };

  return (
    <>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreatePost
          onRequestClose={() => setOpen(false)}
          createPostFunc={createPostFunc}
        />
      </RegularModal>
      {Auth.teacherLoggedIn() && (
        <Button onClick={() => setOpen(true)}>Create Post</Button>
      )}
    </>
  );
};

export default CreatePostContainer;
