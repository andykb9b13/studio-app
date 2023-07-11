import React from "react";
import { useState, useRef } from "react";
import { Button, Menu, MenuItem } from "@mui/joy/";
import { Link } from "react-router-dom";
import DeleteStudentModal from "./DeleteStudentModal";

export default function StudentDetailsMenu({ student, id }) {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        ref={buttonRef}
        id="basic-demo-button"
        aria-controls={"basic-menu"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={buttonRef.current}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-demo-button"
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/teacher/studentDatabase/${student.teacherId}`}>
            <Button>Back to Database</Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteStudentModal studentId={id} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={`/student/${id}/practiceHub`}>
            <Button>To Practice Hub</Button>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
