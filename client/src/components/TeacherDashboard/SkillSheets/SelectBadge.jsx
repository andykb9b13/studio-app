import React from "react";
import { Grid, Typography } from "@mui/joy";
import { badgeList } from "../../common/Assets";

// Component for selecting a badge
const SelectBadge = ({ setBadgeId, setOpen }) => {
  return (
    <>
      <Typography>Select Avatar</Typography>
      <Grid container>
        {badgeList &&
          badgeList.map((badge) => (
            <img
              key={badge.id}
              src={badge.name}
              alt="avatar"
              style={{ width: "20%" }}
              onClick={() => {
                alert(`Badge ${badge.id} selected`);
                setBadgeId(badge.id);
                setOpen(null);
              }}
            />
          ))}
      </Grid>
    </>
  );
};
export default SelectBadge;
