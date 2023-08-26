import React, { useState } from "react";
import { Typography, Button, Input, Textarea, Sheet } from "@mui/joy";
import UploadWidget from "../../../../utils/UploadWidget";
import CheckIcon from "@mui/icons-material/Check";

import { useForm } from "react-hook-form";

const CreateResource = ({ createResourceFunc, onRequestClose }) => {
  const { handleSubmit, register } = useForm();
  const [resourceUrl, setResourceUrl] = useState();

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
        <Typography>Description</Typography>
        <Textarea minRows={4} {...register("description")} />
        <Button type="submit">Create Resource</Button>
      </form>
    </Sheet>
  );
};

export default CreateResource;
