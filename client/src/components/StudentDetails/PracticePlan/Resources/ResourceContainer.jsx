import React, { useState } from "react";
import { Typography, Card, Link, IconButton, Grid } from "@mui/joy";
import RegularModal from "../../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import DeleteModalContent from "../../../common/Modal/DeleteModalContent";
import { DELETE_RESOURCE } from "../../../../utils/mutations";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";

const ResourceContainer = ({ practicePlan, resources, setResources }) => {
  const [deleteResource, { error }] = useMutation(DELETE_RESOURCE);
  const [open, setOpen] = useState(false);
  // const [studentResources, setStudentResources] = useState(resources);

  console.log(resources);
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
    <Card>
      <Typography level="h3">Resource Links</Typography>

      {resources &&
        resources.map((resource) => (
          <React.Fragment key={resource._id}>
            <Link href={resource.url} alt="resource url" target="_blank">
              {resource.resourceName}
            </Link>
            <Typography>{resource.description}</Typography>
            <RegularModal
              name="deleteResource"
              open={open}
              onRequestClose={() => setOpen(false)}
            >
              <DeleteModalContent
                onRequestClose={() => setOpen(false)}
                confirmAction={() => deleteResourceFunc(resource._id)}
              />
            </RegularModal>
            <IconButton onClick={() => setOpen(true)} color="danger">
              <DeleteIcon />
            </IconButton>
            <Divider />
          </React.Fragment>
        ))}
    </Card>
  );
};

export default ResourceContainer;
