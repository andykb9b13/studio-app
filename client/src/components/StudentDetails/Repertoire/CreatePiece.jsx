import React from "react";
import { Card, Typography, Input, Textarea, Button } from "@mui/joy";
import { useForm } from "react-hook-form";

const CreatePiece = ({ createPieceFunc }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = async (userInput) => {
    try {
      createPieceFunc(userInput);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <Typography level="h2">Add a Piece to your Repertoire</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Piece Name</Typography>
        <Input type="text" {...register("pieceName")} />
        <Typography>Composer</Typography>
        <Input type="text" {...register("composer")} />
        <Typography>Description</Typography>
        <Textarea minRows={2} {...register("description")} />
        <Typography>Type of Piece</Typography>
        <Input type="text" {...register("pieceType")} />
        <Typography>Difficulty</Typography>
        <Input type="text" {...register("difficulty")} />
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
};

export default CreatePiece;
