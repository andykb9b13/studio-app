import React, { useContext } from "react";
import { Grid, Typography, Sheet } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import { avatarList } from "../common/Assets";
import { MobileContext } from "../../App";

// Component for displaying the SelectAvatar modal
const SelectAvatar = ({ editAvatarFunc }) => {
  const { isMobile } = useContext(MobileContext); // get isMobile from context to determine the size of the avatar images

  return (
    <Sheet id="selectAvatar" sx={styles.selectAvatarCard}>
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
