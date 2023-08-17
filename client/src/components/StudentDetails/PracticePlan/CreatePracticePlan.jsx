import React, { useContext } from "react";
import { Button, Typography, Input, Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";
import { StudentContext } from "../../../pages/StudentDetails";

const CreatePracticePlan = ({
  resourceName,
  onRequestClose,
  setUserInput,
  createPracticePlanFunc,
}) => {
  const { register, handleSubmit } = useForm();
  const { student } = useContext(StudentContext);
  const [createPracticePlan, { error }] = useMutation(ADD_PRACTICEPLAN);

  const onSubmit = async (userInput) => {
    console.log("userInput", userInput);
    try {
      await createPracticePlan({
        variables: { studentId: student._id, ...userInput },
      });
      alert("Practice Plan Created");
      // setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Could not create Practice Plan");
    }
  };

  return (
    <Sheet>
      <Typography level="h2">{resourceName}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Name</Typography>
        <Input type="text" {...register("name")} />
        <Button
          onClick={createPracticePlanFunc}
          type="submit"
          variant="solid"
          color="success"
        >
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
