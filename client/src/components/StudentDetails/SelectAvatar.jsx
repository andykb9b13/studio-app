import React, { useContext } from "react";
import { Grid, Typography, Sheet } from "@mui/joy";
import { avatarList } from "../common/Assets";
import { MobileContext } from "../../App";

const SelectAvatar = ({ editAvatarFunc }) => {
  const { isMobile } = useContext(MobileContext);

  return (
    <Sheet
      sx={{
        p: 1,
        borderRadius: "4px",
        mt: 1,
        boxShadow: "md",
        maxHeight: "max-content",
        maxWidth: "100%",
        mx: "auto",
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Typography level="h3" textAlign={"center"}>
        Select Avatar
      </Typography>
      <Grid container>
        {avatarList &&
          avatarList.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.name}
              alt="avatar"
              style={isMobile ? { width: "50%" } : { width: "20%" }}
              onClick={() => editAvatarFunc(avatar.id)}
            />
          ))}
      </Grid>
    </Sheet>
  );
};
export default SelectAvatar;
