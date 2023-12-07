import React from "react";

import { Sheet, Input, Button, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { styles } from "../../../../styles/cardstyles";

const EditAssignment = ({ assignment, editAssignmentFunc }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      await editAssignmentFunc(userInput);
    } catch (err) {
      console.error("Error editing assignment", err);
    }
  };

  return (
    <Sheet id="editAssignment" sx={styles.cardStyles}>
      <Typography level="h2">Edit Assignment</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Exercise Name</Typography>
        <Input
          type="text"
          {...register("exerciseName")}
          defaultValue={assignment.exerciseName}
        />
        <Typography>Source</Typography>
        <Input
          type="text"
          {...register("source")}
          defaultValue={assignment.source}
        />
        <Typography>Assignment Type</Typography>
        <Input
          type="text"
          {...register("assignmentType")}
          defaultValue={assignment.assignmentType}
        />
        <Typography>Special Notes</Typography>
        <Input
          type="text"
          {...register("specialNotes")}
          defaultValue={assignment.specialNotes}
        />
        <Typography>Metronome</Typography>
        <Input
          type="text"
          {...register("metronome")}
          defaultValue={assignment.metronome}
        />
        <Typography>Pages</Typography>
        <Input
          type="text"
          {...register("pages")}
          defaultValue={assignment.pages}
        />
        <Typography>Points Worth</Typography>
        <Input
          type="number"
          {...register("points")}
          defaultValue={assignment.pointsWorth}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Sheet>
  );
};

export default EditAssignment;
