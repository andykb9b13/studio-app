import React, { useState } from "react";
import { IconButton } from "@mui/joy";
import RegularModal from "../../../common/Modal/RegularModal";
import { useTeacherContext } from "../../../../utils/Context";
import SelectResource from "./SelectResource";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation } from "@apollo/client";
import { EDIT_PRACTICE_PLAN } from "../../../../utils/mutations";

const SelectResourceContainer = ({ practicePlan, resources, setResources }) => {
  const { teacher } = useTeacherContext();
  const [open, setOpen] = useState(false);
  const [editPracticePlan] = useMutation(EDIT_PRACTICE_PLAN);

  const selectResourceFunc = async (resourceId) => {
    console.log(resourceId);

    try {
      const { data } = await editPracticePlan({
        variables: {
          planId: practicePlan._id,
          resourceId: resourceId,
        },
      });
      alert("Selected resource for plan");
      setOpen(false);
    } catch (err) {
      alert("Could not select resource for plan");
      console.error(err);
    }
  };

  //   const createResourceFunc = async (userInput) => {
  //     try {
  //       const { data } = await createResource({
  //         variables: {
  //           teacherId: student.teacherId,
  //           practicePlanId: practicePlan._id,
  //           ...userInput,
  //         },
  //       });
  //       setResources([...resources, data.addResource]);
  //       alert("Resource Created");
  //       setOpen(false);
  //     } catch (err) {
  //       console.error(err);
  //       alert("Could not create resource");
  //     }
  //   };

  return (
    <>
      <IconButton>
        <SearchIcon onClick={() => setOpen(true)} />
      </IconButton>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SelectResource
          teacherResources={teacher?.resources}
          selectResourceFunc={selectResourceFunc}
        />
      </RegularModal>
    </>
  );
};

export default SelectResourceContainer;
