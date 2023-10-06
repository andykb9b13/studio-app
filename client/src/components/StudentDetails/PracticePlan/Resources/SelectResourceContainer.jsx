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
    try {
      const { data } = await editPracticePlan({
        variables: {
          planId: practicePlan._id,
          resourceId: resourceId,
        },
      });
      alert("Selected resource for plan");
      setOpen(false);
      setResources([...resources, data.editPracticePlan]);
    } catch (err) {
      alert("Could not select resource for plan");
      console.error(err);
    }
  };

  return (
    <>
      <IconButton>
        <SearchIcon onClick={() => setOpen(true)} />
      </IconButton>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SelectResource
          teacherResources={teacher?.resources}
          selectResourceFunc={selectResourceFunc}
          resources={resources}
        />
      </RegularModal>
    </>
  );
};

export default SelectResourceContainer;
