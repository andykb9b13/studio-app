import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Typography, Button } from "@mui/joy";

const CreatePost = ({ createPostFunc }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (userInput) => {
    try {
      console.log("userInput", userInput);
      await createPostFunc(userInput);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Typography level="h2">Create a Post</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Title</Typography>
        <Input type="text" {...register("title")} />
        <Typography>Message</Typography>
        <Textarea minRows={4} {...register("message")} />
        {/* going to add the cloudinary widget to add media to it */}
        <Button type="submit" color="success">
          Create Post
        </Button>
      </form>
    </>
  );
};

export default CreatePost;
