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
  Textarea,
  Radio,
  RadioGroup,
} from "@mui/joy";
import { TeacherContext } from "../../../pages/TeacherDashboard";
import { useForm } from "react-hook-form";
import RegularModal from "../../common/Modal/RegularModal";
import SelectBadge from "./SelectBadge";
import { badgeList } from "../../common/Assets";

const CreateSkillSheet = ({
  onRequestClose,
  createSkillSheetFunc,
  setDifficulty,
  setBadgeId,
  difficulty,
  badgeId,
}) => {
  const { teacher } = useContext(TeacherContext);
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(null);

  const onSubmit = async (userInput) => {
    try {
      console.log("userInput", userInput);
      await createSkillSheetFunc(userInput);
    } catch (err) {
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
      <Button onClick={() => setOpen(1)}>Select Badge</Button>
      <RegularModal open={open === 1} onRequestClose={() => setOpen(false)}>
        <SelectBadge setOpen={setOpen} setBadgeId={setBadgeId} />
      </RegularModal>
      <Button
        component={Link}
        to={`/teacher/${teacher._id}`}
        onClick={onRequestClose}
        color="danger"
      >
        Cancel
      </Button>
    </Card>
  );
};

export default CreateSkillSheet;
