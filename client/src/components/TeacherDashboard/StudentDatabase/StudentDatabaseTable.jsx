import React, { useEffect, useState } from "react";
import { Sheet, Table, IconButton } from "@mui/joy";
import { styles } from "../../../styles/studentDetailsStyles";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import RegularModal from "../../common/Modal/RegularModal";
import DeleteModalContent from "../../common/Modal/DeleteModalContent";
import { DELETE_STUDENT } from "../../../utils/mutations";
import { Delete } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import StudentSort from "./StudentSort";

// Component that displays quick information about each student in the database
const StudentDatabaseTable = ({ students, setStudents }) => {
  const [isMobile, setIsMobile] = useState(false); // state for checking if the window width is less than or equal to 768px
  const [open, setOpen] = useState(false); // state for the modal to delete a student
  const [deleteStudent] = useMutation(DELETE_STUDENT); // mutation for deleting a student
  const [orderedStudents, setOrderedStudents] = useState(); // state for how the students are ordered and displayed

  // function for deleting a student
  const deleteStudentFunc = async (studentId) => {
    await deleteStudent({ variables: { studentId: studentId } });
    alert("Student successfully deleted");
    setOpen(false);
    setStudents(students.filter((student) => student._id !== studentId)); // filter out the deleted student from the displayed students
  };

  // Setting the isMobile state to true if the window width is less than or equal to 768px
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  // Setting the orderedStudents state to the students state when the students state changes
  useEffect(() => {
    setOrderedStudents(students);
  }, [students, setOrderedStudents]);

  return (
    <Sheet id="studentDatabaseTableContainer">
      {/* Component for sorting students based on specific parameters */}
      <StudentSort
        setOrderedStudents={setOrderedStudents}
        students={students}
      />
      {/* Table for displaying the students */}
      <Table
        id="studentDatabaseTable"
        aria-label="basic table"
        stickyHeader
        stripe="even"
        variant="soft"
        sx={styles.studentDatabaseTable}
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
                  {/* Button and Modal for deleting a student */}
                  <IconButton
                    onClick={() => setOpen(true)}
                    color="danger"
                    sx={{ mx: 1 }}
                  >
                    <Delete />
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

                  {/* Click the arrow to go to the studentDetails page of a particular student */}
                  <IconButton
                    component={Link}
                    to={`/teacher/studentDetails/${student._id}`}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default StudentDatabaseTable;
