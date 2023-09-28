import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import RegularModal from "../../common/Modal/RegularModal";
import SelectBadge from "./SelectBadge";
import { badgeList } from "../../common/Assets";
import { useTeacherContext } from "../../../utils/Context";
import UploadWidget from "../../../utils/UploadWidget";

const CreateSkillSheet = ({
  skillSheetUrl,
  setSkillSheetUrl,
  onRequestClose,
  createSkillSheetFunc,
  setDifficulty,
  setBadgeId,
  difficulty,
  badgeId,
}) => {
  const { teacher } = useTeacherContext();
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(null);

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.secure_url);
    setSkillSheetUrl(result?.info?.secure_url);
  }

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
        <Typography>File Link</Typography>
        <Input type="text" value={skillSheetUrl} {...register("url")} />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a File</Button>;
          }}
        </UploadWidget>
        <Typography level="h3">Additional Requirements</Typography>
        <Typography>
          You can also list specific challenges for students in addition to or
          instead of uploading a file.
        </Typography>
        <Typography>
          <b>Scales</b>
        </Typography>
        <Textarea minRows={3} {...register("scales")} />
        <Typography>
          <b>Arpeggios</b>
        </Typography>
        <Textarea minRows={3} {...register("arpeggios")} />
        <Typography>
          <b>Exercises</b>
        </Typography>
        <Textarea minRows={3} {...register("exercises")} />
        <Typography>
          <b>Etudes</b>
        </Typography>
        <Textarea minRows={3} {...register("etudes")} />
        <Typography>
          <b>Pieces</b>
        </Typography>
        <Textarea minRows={3} {...register("pieces")} />
        <Typography level="h3">Optional Points</Typography>
        <Typography>
          Give students an extra incentive by assigning points they can earn
          when they have completed this sheet
        </Typography>
        <Typography>
          <b>Points</b>
        </Typography>
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
