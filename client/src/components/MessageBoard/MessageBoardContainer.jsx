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

  //   const { data } = useQuery(QUERY_POSTS, {
  //     studioId: teacher._id,
  //   });

  //   useEffect(() => {
  //     setPosts(data);
  //   }, [setPosts, data]);

  return (
    <Sheet>
      <Typography>This is the message board</Typography>
      <CreatePostContainer
        open={open}
        setOpen={setOpen}
        posts={posts}
        setPosts={setPosts}
      />
      {teacher.posts?.map((post) => (
        <Post post={post} />
      ))}
    </Sheet>
  );
};

export default MessageBoard;
