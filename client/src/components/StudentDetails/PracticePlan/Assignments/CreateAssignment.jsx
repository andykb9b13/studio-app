import React from "react";
import { Sheet, Button, Input, Typography, Textarea } from "@mui/joy";
import { useForm } from "react-hook-form";

const CreateAssignment = ({ createAssignmentFunc }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      await createAssignmentFunc(userInput);
    } catch (err) {
      console.error(err);
      alert("Could not create assignment");
    }
  };

  return (
    <Sheet sx={{ p: 1, borderRadius: "4px", mt: 1, boxShadow: "md" }}>
      <Typography level="h2">Create Assignment</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Exercise Name</Typography>
        <Input type="text" {...register("exerciseName")} />
        <Typography>Source</Typography>
        <Input type="text" {...register("source")} />
        <Typography>Assignment Type</Typography>
        <Input type="text" {...register("assignmentType")} />
        <Typography>Special Notes</Typography>
        <Textarea minRows={3} {...register("specialNotes")} />
        <Typography>Metronome</Typography>
        <Input type="text" {...register("metronome")} />
        <Typography>Pages</Typography>
        <Input type="text" {...register("pages")} />
        <Typography>Points Worth</Typography>
        <Input type="number" {...register("points")} />
        <Button type="submit">Create Assignment</Button>
      </form>
    </Sheet>
  );
};

export default CreateAssignment;
