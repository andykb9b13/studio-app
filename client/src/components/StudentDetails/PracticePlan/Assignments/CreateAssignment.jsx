import React from "react";
import { Sheet, Button, Input, Typography, Textarea } from "@mui/joy";
import { useForm } from "react-hook-form";
import UploadWidget from "../../../../utils/UploadWidget";

const CreateAssignment = ({
  createAssignmentFunc,
  resourceUrl,
  setResourceUrl,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (userInput) => {
    try {
      await createAssignmentFunc(userInput);
    } catch (err) {
      console.error(err);
      alert("Could not create assignment");
    }
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setResourceUrl(result?.info?.secure_url);
  }

  console.log(resourceUrl);

  return (
    <Sheet
      sx={{
        p: 1,
        borderRadius: "4px",
        mt: 1,
        boxShadow: "md",
        maxHeight: "max-content",
        maxWidth: "100%",
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
        <Typography>Metronome</Typography>
        <Input type="text" {...register("metronome")} />
        <Typography>Pages</Typography>
        <Input type="text" {...register("pages")} />
        <Typography>Points Worth</Typography>
        <Input type="number" {...register("points")} />
        <Typography>Resources</Typography>
        {resourceUrl && (
          <>
            <Typography level="h4">Resource Image</Typography>
            <img
              src={resourceUrl}
              alt="Uploaded resource"
              style={{ maxWidth: "80%" }}
            />
            <Typography level="h5">{resourceUrl}</Typography>
          </>
        )}
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a Resource</Button>;
          }}
        </UploadWidget>

        <Button type="submit" color="success">
          Create Assignment
        </Button>
      </form>
    </Sheet>
  );
};

export default CreateAssignment;
