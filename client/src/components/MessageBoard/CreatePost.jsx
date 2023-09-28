import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea, Typography, Button, Sheet } from "@mui/joy";
import UploadWidget from "../../utils/UploadWidget";

const CreatePost = ({ createPostFunc, postUrl, setPostUrl }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (userInput) => {
    try {
      console.log("userInput", userInput);
      await createPostFunc(userInput);
    } catch (err) {
      console.error(err);
    }
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.secure_url);
    setPostUrl(result?.info?.secure_url);
  }

  return (
    <Sheet sx={{ width: "80vw" }}>
      <Typography level="h2">Create a Post</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Title</Typography>
        <Input type="text" {...register("title")} />
        <Typography>Message</Typography>
        <Textarea minRows={10} {...register("message")} />
        <Typography>Add Title Image</Typography>
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a File</Button>;
          }}
        </UploadWidget>
        <img
          src={postUrl ? postUrl : ""}
          alt="title background"
          style={{ width: "300px" }}
        />
        <Button type="submit" color="success">
          Create Post
        </Button>
      </form>
    </Sheet>
  );
};

export default CreatePost;
