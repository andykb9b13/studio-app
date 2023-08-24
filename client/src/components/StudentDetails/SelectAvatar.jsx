import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Grid, Typography } from "@mui/joy";
import { avatarList } from "../common/Assets";
import { EDIT_STUDENT } from "../../utils/mutations";
import { StudentContext } from "../../pages/StudentDetails";

const SelectAvatar = ({ onRequestClose }) => {
  const { student } = useContext(StudentContext);
  const [editStudent, { error }] = useMutation(EDIT_STUDENT);

  const editAvatarFunc = async (avatarId) => {
    console.log(avatarId);
    try {
      await editStudent({
        variables: {
          studentId: student._id,
          avatarId: avatarId,
        },
      });
      alert(`avatar ${avatarId} selected`);
      onRequestClose();
    } catch (err) {
      console.log(err);
      alert("could not select avater");
    }
  };

  return (
    <>
      <Typography>Select Avatar</Typography>
      <Grid container>
        {avatarList &&
          avatarList.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.name}
              alt="avatar"
              style={{ width: "20%" }}
              onClick={() => editAvatarFunc(avatar.id)}
            />
          ))}
      </Grid>
    </>
  );
};
export default SelectAvatar;
