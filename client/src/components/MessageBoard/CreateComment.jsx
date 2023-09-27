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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          minRows={1}
          {...register("message")}
          placeholder="Write a comment..."
        />
        <Button type="submit" color="neutral">
          Comment
        </Button>
      </form>
    </>
  );
};

export default CreateComment;
