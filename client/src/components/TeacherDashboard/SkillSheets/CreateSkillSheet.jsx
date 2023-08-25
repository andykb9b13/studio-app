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
} from "@mui/joy";
import { TeacherContext } from "../../../pages/TeacherDashboard";
import { useForm } from "react-hook-form";
import SubmitModalContent from "../../common/Modal/SubmitModalContent";
import RegularModal from "../../common/Modal/RegularModal";
import SelectBadge from "./SelectBadge";
import { badgeList } from "../../common/Assets";

const CreateSkillSheet = ({ onRequestClose }) => {
  const { teacher } = useContext(TeacherContext);
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(null);
  const [modalMessage, setModalMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [badgeId, setBadgeId] = useState();

  // const handleChange = (event) => {
  //   setDifficulty(event.target.value);
  // };

  const [createSkillSheet, { errors }] = useMutation(ADD_SKILLSHEET);

  const onSubmit = async (userInput) => {
    try {
      const { data } = await createSkillSheet({
        variables: {
          teacherId: teacher._id,
          difficulty: difficulty,
          badgeId: badgeId,
          ...userInput,
        },
      });
      console.log(data);
      setOpen(2);
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
      <RegularModal open={open === 2} onRequestClose={() => setOpen(false)}>
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
            defaultValue="easy"
            value={difficulty}
            variant="outlined"
            sx={{ p: 4 }}
            {...register("difficulty")}
          >
            <Radio
              value="beginner"
              label="Beginner"
              size="sm"
              onClick={() => setDifficulty("beginner")}
            >
              Beginner
            </Radio>
            <Radio
              value="easy"
              label="Easy"
              size="sm"
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </Radio>
            <Radio
              value="medium"
              label="Medium"
              size="sm"
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </Radio>
            <Radio
              value="advanced"
              label="Advanced"
              size="sm"
              onClick={() => setDifficulty("advanced")}
            >
              Advanced
            </Radio>
            <Radio
              value="expert"
              label="Expert"
              size="sm"
              onClick={() => setDifficulty("expert")}
            >
              Expert
            </Radio>
          </RadioGroup>
          <Typography>Scales</Typography>
          <Textarea minRows={3} {...register("scales")} />
          <Typography>Arpeggios</Typography>
          <Textarea minRows={3} {...register("arpeggios")} />
          <Typography>Exercises</Typography>
          <Textarea minRows={3} {...register("exercises")} />
          <Typography>Etudes</Typography>
          <Textarea minRows={3} {...register("etudes")} />
          <Typography>Pieces</Typography>
          <Textarea minRows={3} {...register("pieces")} />
          <Typography>Points</Typography>
          <Input type="number" {...register("points")} />
          {badgeId ? (
            <img
              src={badgeList[badgeId].name}
              alt="badge"
              style={{ width: "40%" }}
            />
          ) : (
            ""
          )}
          <Button type="submit" color="success">
            Create Skill Sheet
          </Button>
        </form>
      </CardContent>
      <Button onClick={() => setOpen(1)}>Select Badge</Button>
      <RegularModal open={open === 1} onRequestClose={() => setOpen(false)}>
        <SelectBadge setOpen={setOpen} setBadgeId={setBadgeId} />
      </RegularModal>
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
