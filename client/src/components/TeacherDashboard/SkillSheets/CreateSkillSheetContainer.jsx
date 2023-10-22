import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_SKILLSHEET } from "../../../utils/mutations";
import { Button } from "@mui/joy";
import RegularModal from "../../common/Modal/RegularModal";
import CreateSkillSheet from "./CreateSkillSheet";
import { useTeacherContext } from "../../../utils/Context";
import Auth from "../../../utils/auth";

// Component that controlls the createSkillSheet component
const CreateSkillSheetContainer = ({ skillSheets, setSkillSheets }) => {
  const { teacher } = useTeacherContext(); // get teacher info from context
  const [open, setOpen] = useState(false); // state for opening and closing modal
  const [difficulty, setDifficulty] = useState("easy"); // state for difficulty of skill sheet to be passed into createSkillSheetFunc function
  const [badgeId, setBadgeId] = useState(); // state for badgeId of skill sheet to be passed into createSkillSheetFunc function
  const [createSkillSheet] = useMutation(ADD_SKILLSHEET); // mutation for creating a skill sheet
  const [skillSheetUrl, setSkillSheetUrl] = useState(); // state for url of skill sheet to be passed into createSkillSheetFunc function

  // function for handling form submission and calling createSkillSheet mutation
  const createSkillSheetFunc = async (userInput) => {
    const mySheetPoints = parseInt(userInput.points);
    console.log(mySheetPoints);
    try {
      // set the default badgeId to 0 if no badge is selected
      if (!badgeId) {
        setBadgeId(0);
      }
      const { data } = await createSkillSheet({
        variables: {
          teacherId: teacher._id,
          sheetPoints: mySheetPoints,
          difficulty: difficulty,
          badgeId: badgeId,
          sheetName: userInput.sheetName,
          description: userInput.description,
          url: skillSheetUrl,
          scales: userInput.scales,
          exercises: userInput.exercises,
          etudes: userInput.etudes,
          pieces: userInput.pieces,
        },
      });
      console.log(data);
      setOpen(null); // close modal
      setSkillSheets([...skillSheets, data.addSkillSheet]); // add new skill sheet to skillSheets array to be displayed
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
          skillSheetUrl={skillSheetUrl}
          setSkillSheetUrl={setSkillSheetUrl}
          onRequestClose={() => setOpen(false)}
          createSkillSheetFunc={createSkillSheetFunc}
          setDifficulty={setDifficulty}
          setBadgeId={setBadgeId}
          difficulty={difficulty}
          badgeId={badgeId}
        />
      </RegularModal>
      {/* Only a teacher can create a new skill sheet but students will be able to view this component as well */}
      {Auth.teacherLoggedIn() && (
        <Button onClick={() => setOpen(true)}>Create Skill Sheet</Button>
      )}
    </>
  );
};

export default CreateSkillSheetContainer;
