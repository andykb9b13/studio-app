import React, { useState } from "react";
import { Typography, Card, IconButton } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";

import { styles } from "../../../styles/studentDetailsStyles";
import RegularModal from "../../common/Modal/RegularModal";
import SelectAvatar from "../../StudentDetails/SelectAvatar";
import { Edit } from "@mui/icons-material";
import { avatarList } from "../../common/Assets";
import { useMutation } from "@apollo/client";
import { EDIT_TEACHER } from "../../../utils/mutations";
import { useTeacherContext } from "../../../utils/Context";
import EditTeacher from "./EditTeacher";

const TeacherProfile = () => {
  const { teacher, setTeacher } = useTeacherContext();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [editTeacher, { error }] = useMutation(EDIT_TEACHER);

  const editAvatarFunc = async (avatarId) => {
    console.log(avatarId);
    try {
      const editedTeacher = await editTeacher({
        variables: {
          teacherId: teacher._id,
          avatarId: avatarId,
        },
      });
      setTeacher(editedTeacher.data.editTeacher);
      alert(`avatar ${avatarId} selected`);
      setOpen(false);
    } catch (err) {
      console.log(err);
      alert("could not select avater");
    }
  };

  const handleClick = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <>
      <Card sx={styles.card}>
        <Typography
          level="h2"
          component="h2"
          endDecorator={<EditIcon onClick={() => handleClick(1)} />}
        >
          {teacher.firstName} {teacher.lastName}
        </Typography>
        <RegularModal
          open={active === 1}
          onRequestClose={() => setActive(null)}
        >
          <EditTeacher
            onRequestClose={() => setActive(null)}
            setActive={setActive}
          />
        </RegularModal>

        <img
          src={
            teacher.avatarId
              ? avatarList[teacher.avatarId].name
              : avatarList[0].name
          }
          alt="avatar"
          style={{
            borderRadius: "50%",
            width: "20%",
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
        <Typography>
          <b>Teacher:</b> {teacher.firstName} {teacher.lastName}
        </Typography>
        <Typography>
          <b>Username: </b> {teacher.username}
        </Typography>
        <Typography>
          <b>Email:</b> {teacher.email}
        </Typography>
        <Typography>
          <b>Phone Number:</b> {teacher.phoneNumber}
        </Typography>
        <Typography>
          <b>About: </b> {teacher.aboutInfo}
        </Typography>
      </Card>
    </>
  );
};

export default TeacherProfile;
