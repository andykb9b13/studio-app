import React from "react";
import {
  Sheet,
  Select,
  Option,
  Button,
  Input,
  Typography,
  Textarea,
} from "@mui/joy";

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
        <Select defaultValue="etude" {...register("assignmentType")}>
          <Option value="etude">Etude</Option>
          <Option value="technical-exercise">Technical Exercise</Option>
          <Option value="warm-up">Warm Up</Option>
          <Option value="scales">Scales</Option>
          <Option value="piece">Piece</Option>
        </Select>
        <Typography>Special Notes</Typography>
        <Textarea minRows={3} {...register("specialNotes")} />
        <Typography>Metronome</Typography>
        <Input type="text" {...register("metronome")} />
        <Typography>Pages</Typography>
        <Input type="text" {...register("pages")} />
        <Button type="submit">Create Assignment</Button>
      </form>
    </Sheet>
  );
};

export default CreateAssignment;
