import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import { Card, Typography, Box, IconButton } from "@mui/joy";
import level1 from "../../assets/badges/level1.png";
import level2 from "../../assets/badges/level2.png";
import level3 from "../../assets/badges/level3.png";
import level4 from "../../assets/badges/level4.png";
import CountUp from "react-countup";
import { useStudentContext } from "../../utils/Context";
import RegularModal from "../common/Modal/RegularModal";
import SelectAvatar from "./SelectAvatar";
import { Edit } from "@mui/icons-material";
import { avatarList } from "../common/Assets";

const BadgesPoints = () => {
  const { student } = useStudentContext();
  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("could not select avater");
    }
  };

  return (
    <Card variant="outlined">
      <img
        src={
          student.avatarId
            ? avatarList[student.avatarId].name
            : avatarList[0].name
        }
        alt="avatar"
        style={{
          borderRadius: "50%",
          width: "35%",
          marginInline: "auto",
        }}
      />
      <RegularModal open={open} onRequestClose={() => setOpen(false)}>
        <SelectAvatar
          onRequestClose={() => setOpen(false)}
          editAvatarFunc={editAvatarFunc}
        />
      </RegularModal>
      <IconButton onClick={() => setOpen(true)}>
        <Edit />
      </IconButton>
      <Typography level="h3">
        Plan Points: <CountUp end={student.totalPlanPoints} />
      </Typography>
      <Typography level="h3">
        Completed Points: <CountUp end={student.totalCompletedPoints} />
      </Typography>
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        {student.totalCompletedPoints > 200 && (
          <img src={level1} alt="level1 badge" style={{ width: "25%" }} />
        )}
        {student.totalCompletedPoints > 500 && (
          <img src={level2} alt="level2 badge" style={{ width: "25%" }} />
        )}
        {student.totalCompletedPoints > 1000 && (
          <img src={level3} alt="level3 badge" style={{ width: "25%" }} />
        )}
        {student.totalCompletedPoints > 2000 && (
          <img src={level4} alt="level4 badge" style={{ width: "25%" }} />
        )}
      </Box>
    </Card>
  );
};

export default BadgesPoints;
