import React, { useState } from "react";
import RegularModal from "../../../common/Modal/RegularModal";
import CreateAssignment from "./CreateAssignment";
import { IconButton } from "@mui/joy";
import { useStudentContext } from "../../../../utils/Context";
import { ADD_ASSIGNMENT } from "../../../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Add } from "@mui/icons-material";
import Auth from "../../../../utils/auth";

const CreateAssignmentContainer = ({
  practicePlan,
  assignments,
  setAssignments,
  resources,
  setResources,
}) => {
  const { student } = useStudentContext();
  const [createAssignment, { error }] = useMutation(ADD_ASSIGNMENT);
  const [open, setOpen] = useState(false);

  const createAssignmentFunc = async (userInput) => {
    const pointsWorth = parseInt(userInput.points);
    try {
      const { data } = await createAssignment({
        variables: {
          studentId: student._id,
          planId: practicePlan._id,
          pointsWorth: pointsWorth,
          completed: false,
          ...userInput,
        },
      });
      alert("Assignment Created");
      setAssignments([...assignments, data.addAssignment]);
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Could not create assignment");
    }
  };

  return (
    <>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreateAssignment
          onRequestClose={() => setOpen(false)}
          resourceName="Create Practice Plan"
          createAssignmentFunc={createAssignmentFunc}
          resources={resources}
          setResources={setResources}
          practicePlan={practicePlan}
        />
      </RegularModal>
      {Auth.teacherLoggedIn() && (
        <IconButton onClick={() => setOpen(true)}>
          <Add />
        </IconButton>
      )}
    </>
  );
};

export default CreateAssignmentContainer;
