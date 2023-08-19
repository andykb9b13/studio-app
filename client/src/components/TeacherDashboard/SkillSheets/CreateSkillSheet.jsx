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
  Radio,
  RadioGroup,
  FormControl,
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
  const [difficulty, setDifficulty] = useState("easy");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  const [createSkillSheet, { errors }] = useMutation(ADD_SKILLSHEET);

  const onSubmit = async (userInput) => {
    try {
      const { data } = await createSkillSheet({
        variables: {
          teacherId: teacher._id,
          difficulty: difficulty,
          ...userInput,
        },
      });
      console.log(data);
      setOpen(true);
      setSuccess(true);
      setModalMessage("Skill Sheet Created!");
    } catch (err) {
      setOpen(true);
      setSuccess(false);
      setModalMessage("Error Creating Skill Sheet");
      console.error(err);
    }
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
          <Typography>Difficulty</Typography>
          <RadioGroup
            onChange={handleChange}
            value={difficulty}
            name="difficulty"
            variant="outlined"
            sx={{ p: 4 }}
          >
            <Radio value="beginner" label="Beginner" size="sm">
              Beginner
            </Radio>
            <Radio value="easy" label="Easy" size="sm">
              Easy
            </Radio>
            <Radio value="medium" label="Medium" size="sm">
              Medium
            </Radio>
            <Radio value="advanced" label="Advanced" size="sm">
              Advanced
            </Radio>
            <Radio value="expert" label="Expert" size="sm">
              Expert
            </Radio>
          </RadioGroup>
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
