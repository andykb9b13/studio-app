import React from "react";
import { Sheet, Button, Input, Typography, Textarea } from "@mui/joy";
import { useForm } from "react-hook-form";
import CreateResourceContainer from "../Resources/CreateResourceContainer";

const CreateAssignment = ({
  createAssignmentFunc,
  resources,
  setResources,
  practicePlan,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    console.log("userInput", userInput);
    try {
      await createAssignmentFunc(userInput);
      // setResources(...resources);
    } catch (err) {
      console.error(err);
      alert("Could not create assignment");
    }
  };

  return (
    <Sheet
      sx={{
        p: 1,
        borderRadius: "4px",
        mt: 1,
        boxShadow: "md",
        maxHeight: "max-content",
        width: "500px",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
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
        <Typography>Goal</Typography>
        <Textarea minRows={3} {...register("goal")} />
        <Typography>Metronome</Typography>
        <Input type="text" {...register("metronome")} />
        <Typography>Points Worth</Typography>
        <Input type="number" {...register("points")} />
        <Typography>Resources</Typography>
        <CreateResourceContainer
          practicePlan={practicePlan}
          resources={resources}
          setResources={setResources}
        />
        <Button type="submit" color="success">
          Create Assignment
        </Button>
      </form>
    </Sheet>
  );
};

export default CreateAssignment;
