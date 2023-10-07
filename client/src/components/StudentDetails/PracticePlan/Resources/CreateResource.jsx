import React, { useState, useEffect } from "react";
import { Typography, Button, Input, Textarea, Sheet } from "@mui/joy";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UploadWidget from "../../../../utils/UploadWidget";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import { useTeacherContext } from "../../../../utils/Context";
import ClearIcon from "@mui/icons-material/Clear";

const CreateResource = ({ createResourceFunc, onRequestClose }) => {
  const { handleSubmit, register } = useForm();
  const [resourceUrl, setResourceUrl] = useState();
  const { teacher } = useTeacherContext();
  const [resourceTypes, setResourceTypes] = useState();
  const [type, setType] = useState();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let resourceTypeArr = [];
    teacher?.resources.map((resource) => {
      if (
        resource.resourceType &&
        !resourceTypeArr.includes(resource.resourceType)
      ) {
        resourceTypeArr.push(resource.resourceType);
      }
    });
    setResourceTypes(resourceTypeArr);
  }, [teacher, setResourceTypes]);

  console.log(resourceTypes);

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
    console.log(userInput);
    try {
      await createResourceFunc(userInput);
      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setType(event.target.value.toLowerCase());
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
      <Typography level="h2" textAlign={"center"}>
        Create A Resource
      </Typography>
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
        {!hidden && (
          <FormControl fullWidth>
            <InputLabel>Set Resource Type</InputLabel>
            <Select
              label="Select Resource Type"
              onChange={handleChange}
              value={type}
              {...register("resourceType")}
            >
              {resourceTypes?.map((resourceType, i) => (
                <MenuItem key={i} value={resourceType}>
                  {resourceType}
                </MenuItem>
              ))}
              <MenuItem onClick={() => setHidden(true)}>New type...</MenuItem>
            </Select>
          </FormControl>
        )}
        {hidden && (
          <>
            <Typography>New Type</Typography>
            <Input
              type="text"
              placeholder="Create new resource type"
              {...register("resourceType")}
              endDecorator={<ClearIcon onClick={() => setHidden(false)} />}
            />
          </>
        )}

        <Typography>Description</Typography>
        <Textarea minRows={4} {...register("description")} />
        <Button type="submit" color="success">
          Create Resource
        </Button>
      </form>
    </Sheet>
  );
};

export default CreateResource;
