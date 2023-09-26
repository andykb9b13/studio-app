import React, { useState, useEffect } from "react";
import { Sheet, Typography } from "@mui/joy";
import { useTeacherContext } from "../../utils/Context";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import CreatePostContainer from "./CreatePostContainer";
import Post from "./Post";

const MessageBoard = () => {
  const { teacher } = useTeacherContext();
  const [posts, setPosts] = useState(teacher.posts);
  const [open, setOpen] = useState(false);

  console.log(teacher);

  console.log(posts);

  useEffect(() => {
    setPosts(teacher.posts);
  }, [setPosts, teacher]);

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
        <Post post={post} key={post._id} />
      ))}
    </Sheet>
  );
};

export default MessageBoard;
