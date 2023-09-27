import React, { useState, useEffect } from "react";
import { Sheet, Typography } from "@mui/joy";
import { useTeacherContext } from "../../utils/Context";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import CreatePostContainer from "./CreatePostContainer";
import Post from "./Post";
import { DELETE_POST } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const MessageBoard = () => {
  const { id } = useParams();
  const { teacher } = useTeacherContext();
  console.log(teacher);
  const { data } = useQuery(QUERY_POSTS, {
    variables: {
      studioId: teacher._id,
    },
  });
  console.log(data);
  const [posts, setPosts] = useState();
  const [open, setOpen] = useState(false);
  const [deletePost, { error }] = useMutation(DELETE_POST);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    setPosts(data?.posts);
  }, [setPosts, data]);

  const deletePostFunc = async (postId) => {
    try {
      const deletedPost = await deletePost({
        variables: {
          postId: postId,
        },
      });
      setPosts(posts.filter((post) => post._id !== deletedPost._id));
      setDeleteModalOpen(false);
      alert("Post deleted!");
    } catch (err) {
      console.error(err);
      alert("Could not delete post");
    }
  };

  return (
    <Sheet>
      <Typography level="h2" textAlign={"center"}>
        Studio News
      </Typography>
      <CreatePostContainer
        open={open}
        setOpen={setOpen}
        posts={posts}
        setPosts={setPosts}
      />
      {posts?.map((post) => (
        <Post
          post={post}
          key={post._id}
          deletePostFunc={deletePostFunc}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      ))}
    </Sheet>
  );
};

export default MessageBoard;
