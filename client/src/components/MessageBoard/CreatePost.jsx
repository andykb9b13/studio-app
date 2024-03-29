import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Typography, Button, Card, CardActions } from "@mui/joy";
import UploadWidget from "../../utils/UploadWidget";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = ({ createPostFunc, postUrl, setPostUrl }) => {
  const { handleSubmit, register } = useForm();
  const [value, setValue] = useState("");

  const onSubmit = async (userInput) => {
    try {
      console.log("userInput", userInput);
      await createPostFunc(userInput, value);
    } catch (err) {
      console.error(err);
    }
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(result?.info?.secure_url);
    setPostUrl(result?.info?.secure_url);
  }

  return (
    <Card sx={{ width: "80vw", overflow: "auto", resize: "horizontal" }}>
      <Typography level="h2">Create a Post</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>
          <b>Title</b>
        </Typography>
        <Input
          type="text"
          {...register("title")}
          placeholder="Create a title..."
        />
        <Typography>
          <b>Message</b>
        </Typography>
        {/* <Textarea
          minRows={10}
          {...register("message")}
          placeholder="Write your message..."
        /> */}
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Typography>{postUrl ? "Title Image" : "Add Title Image"}</Typography>
        {postUrl && (
          <img
            src={postUrl}
            alt="title background"
            style={{ width: "300px" }}
          />
        )}
        <CardActions>
          {" "}
          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return <Button onClick={handleOnClick}>Upload a File</Button>;
            }}
          </UploadWidget>
          <Button type="submit" color="success">
            Create Post
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default CreatePost;
