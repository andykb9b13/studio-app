import React, { useState } from "react";
import { Typography, Card, IconButton } from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import { useStudentContext } from "../../utils/Context";
import { styles } from "../../styles/studentDetailsStyles";
import RegularModal from "../common/Modal/RegularModal";
import SelectAvatar from "./SelectAvatar";
import { Edit } from "@mui/icons-material";
import { avatarList } from "../common/Assets";
import { useMutation } from "@apollo/client";
import { EDIT_STUDENT } from "../../utils/mutations";

// Component for displaying the student's information
const StudentInfo = ({ handleClick, teacher }) => {
  const { student } = useStudentContext(); // get student from context
  const [open, setOpen] = useState(false); // state for opening the SelectAvatar modal
  const [editStudent] = useMutation(EDIT_STUDENT); // mutation for editing the student

  // mutation for editing the student's avatar
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
      setOpen(false); // close the modal
    } catch (err) {
      console.log(err);
      alert("could not select avater");
    }
  };

  return (
    <>
      <Card id="studentInfoCard" sx={styles.card}>
        <Typography
          level="h2"
          component="h2"
          endDecorator={<EditIcon onClick={() => handleClick(1)} />}
        >
          {student.firstName} {student.lastName}
        </Typography>

        <img
          src={
            student.avatarId
              ? avatarList[student.avatarId].name
              : avatarList[0].name
          }
          alt="student avatar"
          style={{
            borderRadius: "50%",
            width: "35%",
            marginInline: "auto",
          }}
        />
        {/* Modal for selecting an avatar */}
        <IconButton onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
        <RegularModal open={open} onRequestClose={() => setOpen(false)}>
          <SelectAvatar
            onRequestClose={() => setOpen(false)}
            editAvatarFunc={editAvatarFunc}
          />
        </RegularModal>

        {/* Displaying the student's information */}
        <Typography>
          <b>Teacher:</b> {teacher.firstName} {teacher.lastName}
        </Typography>
        <Typography>
          <b>Username: </b> {student.username}
        </Typography>
        <Typography>
          <b>Email:</b> {student.email}
        </Typography>
        <Typography>
          <b>Primary Contact:</b> {student.primaryContact}
        </Typography>
        <Typography>
          <b>Primary Contact Email:</b> {student.primaryContactEmail}
        </Typography>
        <Typography>
          <b>Instrument:</b> {student.instrument}
        </Typography>
        <Typography>
          <b>Grade:</b> {student.grade}
        </Typography>
        <Typography>
          <b>School:</b> {student.school}
        </Typography>
        <Typography>
          <b>Lesson Day:</b> {student.lessonDay}
        </Typography>
        <Typography>
          <b>Lesson Location:</b> {student.lessonLocation}
        </Typography>
        <Card>
          <Typography level="h2">Goals</Typography>
        </Card>
      </Card>
    </>
  );
};

export default StudentInfo;
