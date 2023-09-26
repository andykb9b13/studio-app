import React from "react";
import { Textarea, Typography, Button } from "@mui/joy";
import { useForm } from "react-hook-form";

const CreateComment = ({ open, setOpen, createCommentFunc }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      console.log("userInput", userInput);
      await createCommentFunc(userInput);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography level="h2">Create Comment</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Message</Typography>
        <Textarea minRows={6} {...register("message")} />
        <Button type="submit" color="success">
          Create Comment
        </Button>
      </form>
    </>
  );
};

export default CreateComment;
