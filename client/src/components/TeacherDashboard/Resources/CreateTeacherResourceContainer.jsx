import React, { useState } from "react";
import RegularModal from "../../common/Modal/RegularModal";
import { IconButton } from "@mui/joy";
import { useMutation } from "@apollo/client";
import CreateResource from "../../StudentDetails/PracticePlan/Resources/CreateResource";
import { ADD_RESOURCE } from "../../../utils/mutations";
import AddIcon from "@mui/icons-material/Add";
import Auth from "../../../utils/auth";
import { useTeacherContext } from "../../../utils/Context";

// Component that controlls CreateResource component and the mutation for creating a resource
const CreateTeacherResourceContainer = ({ resources, setResources }) => {
  const [createResource, { error }] = useMutation(ADD_RESOURCE); // mutation for creating a resource
  const [open, setOpen] = useState(false); // state for opening and closing the modal
  const { teacher } = useTeacherContext(); // get the teacher from context

  // function for handling creating a resource
  const createResourceFunc = async (userInput) => {
    try {
      const { data } = await createResource({
        variables: {
          teacherId: teacher._id,
          ...userInput,
        },
      });
      setResources([...resources, data.addResource]); // add the created resource to the resources array so it is displayed
      alert("Resource Created");
      setOpen(false); //  close modal
      console.log(data);
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
          <AddIcon />
        </IconButton>
      )}
    </>
  );
};

export default CreateTeacherResourceContainer;
