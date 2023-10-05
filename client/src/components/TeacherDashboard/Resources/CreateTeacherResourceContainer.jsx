import React, { useState } from "react";
import RegularModal from "../../common/Modal/RegularModal";
import { IconButton } from "@mui/joy";
import { useMutation } from "@apollo/client";
import CreateResource from "../../StudentDetails/PracticePlan/Resources/CreateResource";
import { ADD_RESOURCE } from "../../../utils/mutations";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Auth from "../../../utils/auth";
import { useTeacherContext } from "../../../utils/Context";

const CreateTeacherResourceContainer = ({ resources, setResources }) => {
  const [createResource, { error }] = useMutation(ADD_RESOURCE);
  const [open, setOpen] = useState(false);
  const { teacher } = useTeacherContext();

  const createResourceFunc = async (userInput) => {
    try {
      const { data } = await createResource({
        variables: {
          teacherId: teacher._id,
          ...userInput,
        },
      });
      setResources([...resources, data.addResource]);
      alert("Resource Created");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Could not create resource");
    }
  };

  return (
    <>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreateResource
          onRequestClose={() => setOpen(false)}
          resourceName="Create Resource"
          createResourceFunc={createResourceFunc}
        />
      </RegularModal>
      {Auth.teacherLoggedIn() && (
        <IconButton onClick={() => setOpen(true)}>
          <AttachFileIcon color="success" />
        </IconButton>
      )}
    </>
  );
};

export default CreateTeacherResourceContainer;
