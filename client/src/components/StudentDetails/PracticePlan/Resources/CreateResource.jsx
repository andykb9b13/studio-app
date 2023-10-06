import React, { useState } from "react";
import {
  Typography,
  Button,
  Input,
  Textarea,
  Sheet,
  Select,
  Option,
} from "@mui/joy";
import UploadWidget from "../../../../utils/UploadWidget";
import CheckIcon from "@mui/icons-material/Check";

import { useForm } from "react-hook-form";
import { useTeacherContext } from "../../../../utils/Context";

const CreateResource = ({ createResourceFunc, onRequestClose }) => {
  const { handleSubmit, register } = useForm();
  const [resourceUrl, setResourceUrl] = useState();
  const { teacher } = useTeacherContext();

  console.log(resourceUrl);

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.secure_url);
    setResourceUrl(result?.info?.secure_url);
  }

  const onSubmit = async (userInput) => {
    try {
      await createResourceFunc(userInput);
      onRequestClose();
    } catch (err) {
      console.error(err);
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
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Resource Name</Typography>
        <Input type="text" {...register("resourceName")} />
        <Typography>Url</Typography>
        <Input type="text" value={resourceUrl} {...register("url")} />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a Resource</Button>;
          }}
        </UploadWidget>
        {resourceUrl && <CheckIcon color="success" />}
        <Typography>Select Resource Type</Typography>
        <Select {...register("resourceType")}>
          {teacher?.resourceTypes?.map((resourceType) => (
            <Option key={resourceType} value={resourceType}>
              {resourceType}
            </Option>
          ))}
        </Select>
        <Typography>New Type</Typography>
        <Input
          type="text"
          {...register("resourceType")}
          placeholder="Create new resource type"
        />
        <Typography>Description</Typography>
        <Textarea minRows={4} {...register("description")} />
        <Button type="submit">Create Resource</Button>
      </form>
    </Sheet>
  );
};

export default CreateResource;
