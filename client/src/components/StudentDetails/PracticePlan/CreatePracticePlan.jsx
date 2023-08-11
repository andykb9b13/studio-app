import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRACTICEPLAN } from "../../../utils/mutations";
import { Button, Typography, Input, Sheet } from "@mui/joy";
import { StudentContext } from "../../../pages/StudentDetails";
import { useForm } from "react-hook-form";

const CreatePracticePlan = () => {
  const { student } = useContext(StudentContext);
  const { register, handleSubmit } = useForm();
  const [createPracticePlan, { errors }] = useMutation(ADD_PRACTICEPLAN);

  const onSubmit = async (userInput) => {
    try {
      const { data } = await createPracticePlan({
        variables: { studentId: student._id, ...userInput },
      });
      alert("Practice Plan Created");
    } catch (err) {
      console.error(err);
      alert("Could not create Practice Plan");
    }
  };

  return (
    <Sheet
      sx={{ mx: "auto", mt: 3, p: 2, borderRadius: "4px", boxShadow: "md" }}
    >
      <Typography level="h2">Create a Practice Plan</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Name</Typography>
        <Input type="text" {...register("name")} />
        <Button sx={{ mt: 2 }} type="submit">
          Create Practice Plan
        </Button>
      </form>
    </Sheet>
  );
};

export default CreatePracticePlan;
