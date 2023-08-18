import { useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ADD_SKILLSHEET } from "../../../utils/mutations";
import {
  Card,
  Input,
  Typography,
  Divider,
  Button,
  CardContent,
  CardActions,
  Textarea,
} from "@mui/joy";
import { TeacherContext } from "../../../pages/TeacherDashboard";
import { useForm } from "react-hook-form";
import SubmitModalContent from "../../common/Modal/SubmitModalContent";
import RegularModal from "../../common/Modal/RegularModal";

const CreateSkillSheet = ({ onRequestClose }) => {
  const { teacher } = useContext(TeacherContext);
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState();
  const [success, setSuccess] = useState(false);

  const [createSkillSheet, { errors }] = useMutation(ADD_SKILLSHEET);

  const onSubmit = async (userInput) => {
    // try {
    //   const { data } = await createSkillSheet({
    //     variables: { teacherId: teacher._id, ...userInput },
    //   });
    //   console.log(data);
    //   setOpen(true);
    //   setSuccess(true);
    //   setModalMessage("Skill Sheet Created!");
    // } catch (err) {
    //   setOpen(true);
    //   setSuccess(false);
    //   setModalMessage("Error Creating Skill Sheet");
    //   console.error(err);
    // }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h1">Create Skill Sheet</Typography>
      <Divider inset="none" />
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SubmitModalContent
          message={modalMessage}
          success={success}
          onRequestClose={() => setOpen(false)}
        />
      </RegularModal>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>Sheet Name</Typography>
          <Input type="text" {...register("sheetName")} />
          <Typography>Description</Typography>
          <Textarea minRows={3} {...register("description")} />
          <Typography>Scales</Typography>
          <Input type="text" {...register("scales")} />
          <Typography>Arpeggios</Typography>
          <Input type="text" {...register("arpeggios")} />
          <Typography>Articulation</Typography>
          <Input type="text" {...register("articulation")} />
          <Typography>Slurs</Typography>
          <Input type="text" {...register("slurs")} />
          <Typography>Long Tones</Typography>
          <Input type="text" {...register("longTones")} />
          <Typography>Exercises</Typography>
          <Input type="text" {...register("exercises")} />
          <Typography>Etudes</Typography>
          <Input type="text" {...register("etudes")} />
          <Typography>Pieces</Typography>
          <Input type="text" {...register("pieces")} />
          <Button type="submit" color="success">
            Create Skill Sheet
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/teacher/${teacher._id}`}
          onClick={onRequestClose}
          color="danger"
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateSkillSheet;
