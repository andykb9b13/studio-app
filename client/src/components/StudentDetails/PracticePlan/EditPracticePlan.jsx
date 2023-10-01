import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_PRACTICE_PLAN } from "../../../utils/mutations";
import {
  Sheet,
  Input,
  Button,
  Typography,
  FormHelperText,
  Textarea,
} from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../../../styles/cardstyles";

const EditPracticePlan = ({ practicePlan, setActivePlan, setOpen }) => {
  const [editPracticePlan, { loading, error }] =
    useMutation(EDIT_PRACTICE_PLAN);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    console.log(practicePlan._id);
    console.log(userInput);
    try {
      const editedPlan = await editPracticePlan({
        variables: {
          planId: practicePlan?._id,
          ...userInput,
        },
      });
      console.log(editedPlan.data.editPracticePlan);
      setActivePlan(editedPlan.data.editPracticePlan);
      setOpen(0);
      alert("Practice Plan successfully edited!");
    } catch (err) {
      console.error(err);
      setOpen(0);
      alert("Could not edit practice plan");
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
        width: "80vw",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h2">Edit Practice Plan</Typography>
      {error && (
        <FormHelperText sx={styles.errorText}>{error.message}</FormHelperText>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Plan Name</Typography>
        <Input
          type="text"
          {...register("name")}
          defaultValue={practicePlan?.name}
        />
        <Typography>Plan Notes</Typography>
        <Textarea
          minRows={3}
          type="text"
          {...register("planNotes")}
          defaultValue={practicePlan?.planNotes}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditPracticePlan;
