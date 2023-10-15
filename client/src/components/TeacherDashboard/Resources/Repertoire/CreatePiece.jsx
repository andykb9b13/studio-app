import React from "react";
import { Card, Typography, Input, Textarea, Button } from "@mui/joy";
import { useForm } from "react-hook-form";
import UploadWidget from "../../../../utils/UploadWidget";

const CreatePiece = ({ createPieceFunc, setPieceUrl, pieceUrl }) => {
  const { handleSubmit, register } = useForm();

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.secure_url);
    setPieceUrl(result?.info?.secure_url);
  }

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
        <Typography>File Link</Typography>
        <Input type="text" value={pieceUrl} {...register("url")} />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a File</Button>;
          }}
        </UploadWidget>
        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
};

export default CreatePiece;
