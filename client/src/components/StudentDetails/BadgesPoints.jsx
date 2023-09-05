import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";
import { Card, Typography, Box, IconButton } from "@mui/joy";
import { levelList } from "../common/Assets";
import CountUp from "react-countup";
import { useStudentContext } from "../../utils/Context";
import RegularModal from "../common/Modal/RegularModal";
import SelectAvatar from "./SelectAvatar";
import { Edit } from "@mui/icons-material";
import { avatarList } from "../common/Assets";
import { styles } from "../../styles/studentDetailsStyles";
import ProgressBar from "../common/ProgressBar";

const BadgesPoints = () => {
  const { student } = useStudentContext();
  const [open, setOpen] = useState(false);
  const [editStudent, { error }] = useMutation(EDIT_STUDENT);
  const [progressPercentage, setProgressPercentage] = useState(0);

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

  // determine which is the next badge
  const nextBadge = (points) => {
    if (points < 200) {
      return "200";
    } else if (points >= 200 && points < 500) {
      return "500";
    } else if (points >= 500 && points < 1000) {
      return "1000";
    } else if (points >= 1000 && points < 1500) {
      return "1500";
    } else if (points >= 1500 && points < 2000) {
      return "2000";
    } else if (points >= 2000 && points < 3000) {
      return "3000";
    } else if (points >= 3000 && points < 4000) {
      return "4000";
    } else if (points >= 4000 && points < 5000) {
      return "5000";
    }
  };

  // set the percentage for the progress bar
  useEffect(() => {
    const percentage = Math.floor(
      (student.totalCompletedPoints / nextBadge(student.totalCompletedPoints)) *
        100
    );
    setProgressPercentage(percentage);
  }, [setProgressPercentage, student]);

  return (
    <Card sx={styles.card}>
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
      <Typography level="h5">
        Plan Points: <CountUp end={student.totalPlanPoints} />
      </Typography>
      <Typography level="h5">Skill Sheet Points:</Typography>
      <Typography level="h5">
        Completed Points: <CountUp end={student.totalCompletedPoints} />
      </Typography>
      <Typography level="h5">
        Next Badge: {nextBadge(student.totalCompletedPoints)} points
      </Typography>
      <ProgressBar
        percentage={progressPercentage}
        width={"150px"}
        height={"150px"}
      />
      <Typography level="h3">Badges: </Typography>
      <Box variant="solid">
        {student.totalCompletedPoints > 200 && (
          <img
            src={levelList[0].name}
            alt="level1 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 500 && (
          <img
            src={levelList[1].name}
            alt="level2 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 1000 && (
          <img
            src={levelList[2].name}
            alt="level3 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 1500 && (
          <img
            src={levelList[3].name}
            alt="level4 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 2000 && (
          <img
            src={levelList[4].name}
            alt="level5 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 3000 && (
          <img
            src={levelList[5].name}
            alt="level6 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 4000 && (
          <img
            src={levelList[6].name}
            alt="level7 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 5000 && (
          <img
            src={levelList[7].name}
            alt="level8 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 6000 && (
          <img
            src={levelList[8].name}
            alt="level9 badge"
            style={{ width: "25%" }}
          />
        )}
        {student.totalCompletedPoints > 7000 && (
          <img
            src={levelList[9].name}
            alt="level10 badge"
            style={{ width: "25%" }}
          />
        )}
      </Box>
    </Card>
  );
};

export default BadgesPoints;
