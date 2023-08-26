import React, { useState } from "react";
import {
  Typography,
  Card,
  Link,
  IconButton,
  Grid,
  CardContent,
  CardCover,
} from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";
import { useMutation } from "@apollo/client";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import { DELETE_RESOURCE } from "../../../utils/mutations";
import DeleteIcon from "@mui/icons-material/Delete";
import musicNoteBkgd from "../../../assets/musicNoteBkgd.png";

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
      <Typography level="h3">Resource Links</Typography>
      <Grid container>
        {resources &&
          resources.map((resource) => (
            <Grid key={resource._id} xs={12} md={3} lg={3}>
              <Card sx={{ height: "100%", mx: 1, my: 1, boxShadow: "lg" }}>
                <CardCover>
                  <img src={musicNoteBkgd} alt="music notes" />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent>
                  <Link
                    href={resource.url}
                    alt="resource url"
                    target="_blank"
                    sx={{ color: "blue" }}
                    level="h3"
                  >
                    <b>{resource.resourceName}</b>
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
                </CardContent>

                <IconButton onClick={() => setOpen(true)} color="danger">
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default TeacherResourceContainer;
