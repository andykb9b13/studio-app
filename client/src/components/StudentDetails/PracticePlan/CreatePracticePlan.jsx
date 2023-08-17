import React from "react";
import { Button, Typography, Input, Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";

const CreatePracticePlan = ({
  resourceName,
  onRequestClose,
  createPracticePlanFunc,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      console.log("User input", userInput);
      await createPracticePlanFunc(userInput);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet>
      <Typography level="h2">{resourceName}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Name</Typography>
        <Input type="text" {...register("name")} />
        <Button type="submit" variant="solid" color="success">
          Save
        </Button>
        <Button variant="solid" color="danger" onClick={onRequestClose}>
          Cancel
        </Button>
      </form>
    </Sheet>
  );
};

export default CreatePracticePlan;
