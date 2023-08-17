import React, { useState, useContext } from "react";
import RegularModal from "../../../common/Modal/RegularModal";
import CreateAssignment from "./CreateAssignment";
import { IconButton } from "@mui/joy";
import { StudentContext } from "../../../../pages/StudentDetails";
import { ADD_ASSIGNMENT } from "../../../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Add } from "@mui/icons-material";

const CreateAssignmentContainer = ({
  practicePlan,
  assignments,
  setAssignments,
}) => {
  const { student } = useContext(StudentContext);
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
        />
      </RegularModal>
      <IconButton onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
    </>
  );
};

export default CreateAssignmentContainer;
