import React from "react";
import { Grid, Typography } from "@mui/joy";
import { avatarList } from "../common/Assets";

const SelectAvatar = ({ editAvatarFunc }) => {
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
