import { useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { ADD_SKILLSHEET } from "../../../utils/mutations";
import { Button } from "@mui/joy";
import { TeacherContext } from "../../../pages/TeacherDashboard";
import RegularModal from "../../common/Modal/RegularModal";
import CreateSkillSheet from "./CreateSkillSheet";

const CreateSkillSheetContainer = ({ skillSheets, setSkillSheets }) => {
  const { teacher } = useContext(TeacherContext);
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [badgeId, setBadgeId] = useState();
  const [createSkillSheet, { errors }] = useMutation(ADD_SKILLSHEET);

  const createSkillSheetFunc = async (userInput) => {
    try {
      if (!badgeId) {
        setBadgeId(0);
      }
      const { data } = await createSkillSheet({
        variables: {
          teacherId: teacher._id,
          difficulty: difficulty,
          badgeId: badgeId,
          ...userInput,
        },
      });
      console.log(data);
      setOpen(null);
      setSkillSheets([...skillSheets, data.addSkillSheet]);
      alert("Skill Sheet created");
    } catch (err) {
      setOpen(true);
      alert("Could not create skill sheet");
      console.error(err);
    }
  };

  return (
    <>
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <CreateSkillSheet
          onRequestClose={() => setOpen(false)}
          createSkillSheetFunc={createSkillSheetFunc}
          setDifficulty={setDifficulty}
          setBadgeId={setBadgeId}
          difficulty={difficulty}
          badgeId={badgeId}
        />
      </RegularModal>
      <Button onClick={() => setOpen(true)}>Create Skill Sheet</Button>
    </>
  );
};

export default CreateSkillSheetContainer;
