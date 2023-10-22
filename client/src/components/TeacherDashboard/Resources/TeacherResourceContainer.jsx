import React, { useState } from "react";
import { Typography, Card, Sheet } from "@mui/joy";
import TeacherReasourceTable from "./TeacherResourceTable";
import { useMutation } from "@apollo/client";
import CreateTeacherResourceContainer from "./CreateTeacherResourceContainer";
import { DELETE_RESOURCE } from "../../../utils/mutations";
import TeacherPiecesContainer from "./Repertoire/TeacherPiecesContainer";

// Component for displaying the teacher resources
const TeacherResourceContainer = ({ resources, setResources }) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE); // mutation for deleting a resource
  const [open, setOpen] = useState(false); // state for opening and closing the modal

  // function for handling deleting a resource
  const deleteResourceFunc = async (resourceId) => {
    try {
      await deleteResource({
        variables: {
          resourceId: resourceId,
        },
      });
      alert("Resource Deleted!");
      setResources(resources.filter((resource) => resource._id !== resourceId)); // remove the deleted resource from the resources array so it is no longer displayed
      setOpen(false); // close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet id="teacherResourceContainer">
      {/* Displays the pieces a teacher has created */}
      <Card id="teacherPiecesContainerCard" variant="outlined">
        <TeacherPiecesContainer />
      </Card>

      {/* Displays the container for a teacher to create a resource */}
      <Card id="createTeacherResourceContainerCard" variant="outlined">
        <Typography level="h2" textAlign={"center"}>
          Create Resource
        </Typography>
        <CreateTeacherResourceContainer
          resources={resources}
          setResources={setResources}
        />
      </Card>

      {/* Diplays all of the resources a teacher has created */}
      <Card id="teacherResourceTableCard" variant="outlined">
        <Typography level="h2" textAlign={"center"}>
          Resource Links
        </Typography>
        <TeacherReasourceTable
          deleteResourceFunc={deleteResourceFunc}
          resources={resources}
          open={open}
          setOpen={setOpen}
        />
      </Card>
    </Sheet>
  );
};

export default TeacherResourceContainer;
