import React, { useEffect, useState } from "react";
import { Sheet, Table, IconButton } from "@mui/joy";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import { DELETE_STUDENT } from "../../../utils/mutations";
import { Delete } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StudentSort from "./StudentSort";

const StudentDatabaseTable = ({ students, setStudents }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteStudent, { error }] = useMutation(DELETE_STUDENT);
  const [orderedStudents, setOrderedStudents] = useState();
  // function for deleting a student
  const deleteStudentFunc = async (studentId) => {
    await deleteStudent({ variables: { studentId: studentId } });
    alert("Student successfully deleted");
    setOpen(false);
    setStudents(students.filter((student) => student._id !== studentId));
  };

  // Setting the isMobile state to true if the window width is less than or equal to 768px
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    setOrderedStudents(students);
  }, [students, setOrderedStudents]);

  return (
    <Sheet>
      <StudentSort
        setOrderedStudents={setOrderedStudents}
        students={students}
      />

      <Table
        aria-label="basic table"
        stickyHeader
        stripe="even"
        variant="soft"
        sx={{
          borderRadius: "4px",
          boxShadow: "lg",
          p: 2,
          mb: 3,
          backgroundColor: "lightblue",
        }}
      >
        <thead>
          <tr>
            <th>Student Name</th>
            {!isMobile ? <th>Instrument</th> : null}
            {!isMobile ? <th>Primary Contact</th> : null}
            {!isMobile ? <th>Grade</th> : null}
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {orderedStudents &&
            orderedStudents?.map((student, i) => (
              <tr key={i}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                {!isMobile ? <td>{student.instrument}</td> : null}
                {!isMobile ? <td>{student.primaryContact}</td> : null}
                {!isMobile ? <td>{student.grade}</td> : null}
                <td>
                  <IconButton
                    onClick={() => setOpen(true)}
                    color="danger"
                    sx={{ mx: 1 }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/teacher/studentDetails/${student._id}`}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>

                  <RegularModal
                    open={open}
                    onRequestClose={() => setOpen(false)}
                  >
                    <DeleteModalContent
                      onRequestClose={() => setOpen(false)}
                      confirmAction={() => deleteStudentFunc(student._id)}
                      resourceName="student"
                    />
                  </RegularModal>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default StudentDatabaseTable;
