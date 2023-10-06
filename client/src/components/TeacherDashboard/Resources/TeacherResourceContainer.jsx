import React, { useState } from "react";
import { Typography, Card } from "@mui/joy";
import TeacherReasourceTable from "./TeacherResourceTable";
import { useMutation } from "@apollo/client";
import CreateTeacherResourceContainer from "./CreateTeacherResourceContainer";
import { DELETE_RESOURCE } from "../../../utils/mutations";

const TeacherResourceContainer = ({ resources, setResources }) => {
  const [deleteResource, { error }] = useMutation(DELETE_RESOURCE);
  const [open, setOpen] = useState(false);

  const deleteResourceFunc = async (resourceId) => {
    try {
      await deleteResource({
        variables: {
          resourceId: resourceId,
        },
      });
      alert("Resource Deleted!");
      setResources(resources.filter((resource) => resource._id !== resourceId));
      setOpen(false);
    } catch (err) {}
  };

  return (
    <>
      <Typography level="h2" textAlign={"center"}>
        Resource Links
      </Typography>
      <Typography level="body2">Create Resource</Typography>
      <CreateTeacherResourceContainer
        resources={resources}
        setResources={setResources}
      />
      <Card variant="outlined">
        <TeacherReasourceTable
          deleteResourceFunc={deleteResourceFunc}
          resources={resources}
          open={open}
          setOpen={setOpen}
        />
      </Card>
    </>
  );
};

export default TeacherResourceContainer;
