import React, { useState, useContext } from "react";
import RegularModal from "../../../common/Modal/RegularModal";
import { IconButton } from "@mui/joy";
import { StudentContext } from "../../../../pages/StudentDetails";
import { useMutation } from "@apollo/client";
import { Add } from "@mui/icons-material";
import CreateResource from "./CreateResource";
import { ADD_RESOURCE } from "../../../../utils/mutations";

const CreateResourceContainer = ({ practicePlan }) => {
  const { student } = useContext(StudentContext);
  // const [resources, setResources] = useState();
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
      // setResources([...resources, data.createResource]);
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
        <Add />
      </IconButton>
    </>
  );
};

export default CreateResourceContainer;
