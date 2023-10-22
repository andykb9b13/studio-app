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

// Component for editing a practice plan
const EditPracticePlan = ({ practicePlan, setActivePlan, setOpen }) => {
  const [editPracticePlan, { error }] = useMutation(EDIT_PRACTICE_PLAN); // edit practice plan mutation
  const { register, handleSubmit } = useForm(); // form handling with react-hook-form

  //form submission function that calls the edit practice plan mutation
  const onSubmit = async (userInput) => {
    try {
      const editedPlan = await editPracticePlan({
        variables: {
          planId: practicePlan?._id,
          ...userInput,
        },
      });
      setActivePlan(editedPlan.data.editPracticePlan); // set active plan to edited plan
      setOpen(0); // close modal
      alert("Practice Plan successfully edited!");
    } catch (err) {
      console.error(err);
      setOpen(0);
      alert("Could not edit practice plan");
    }
  };

  return (
    <Sheet
      id="editPracticePlan"
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
