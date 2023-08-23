import React, { useState } from "react";
import RegularModal from "../../../common/Modal/RegularModal";
import { IconButton } from "@mui/joy";
import { useMutation } from "@apollo/client";
import CreateResource from "./CreateResource";
import { ADD_RESOURCE } from "../../../../utils/mutations";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const CreateResourceContainer = ({ practicePlan, resources, setResources }) => {
  const [createResource, { error }] = useMutation(ADD_RESOURCE);
  const [open, setOpen] = useState(false);
  const [resourceUrl, setResourceUrl] = useState([]);

  const createResourceFunc = async (userInput) => {
    console.log(userInput);
    console.log(practicePlan._id);
    try {
      const { data } = await createResource({
        variables: {
          practicePlanId: practicePlan._id,
          ...userInput,
        },
      });
      console.log(data);
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
          // resources={resources}
          // setResources={setResources}
          resourceUrl={resourceUrl}
          setResourceUrl={setResourceUrl}
        />
      </RegularModal>
      <IconButton onClick={() => setOpen(true)}>
        <AttachFileIcon color="success" />
      </IconButton>
    </>
  );
};

export default CreateResourceContainer;
