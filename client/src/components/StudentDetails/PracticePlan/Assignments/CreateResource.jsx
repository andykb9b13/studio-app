import React, { useState } from "react";
import { Typography, Button, Input, Textarea } from "@mui/joy";
import UploadWidget from "../../../../utils/UploadWidget";

import { useForm } from "react-hook-form";

const CreateResource = ({
  resourceUrl,
  setResourceUrl,
  // resources,
  // setResources,
  createResourceFunc,
  onRequestClose,
}) => {
  const { handleSubmit, register } = useForm();

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Resource Name</Typography>
        <Input type="text" {...register("resourceName")} />
        <Typography>Url</Typography>
        <Input type="text" /*value={resourceUrl}*/ {...register("url")} />
        <Typography>Description</Typography>
        <Textarea minRows={4} {...register("description")} />
        <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return <Button onClick={handleOnClick}>Upload a Resource</Button>;
          }}
        </UploadWidget>
        <Button type="submit">Create Resource</Button>
      </form>
    </>
  );
};

export default CreateResource;
