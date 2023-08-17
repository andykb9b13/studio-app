import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import { DELETE_STUDENT } from "../utils/mutations";
import { Sheet, Button } from "@mui/joy";
import { styles } from "../styles/studentDetailsStyles";
import StudentDetailsCard from "../components/StudentDetails/StudentDetailsCard";
import RegularModal from "../components/common/Modal/RegularModal";
import DeleteModalContent from "../components/common/Modal/DeleteModalContent";

// Creating student context to be passed to all components in this thread
export const StudentContext = createContext();

// Top component in the tree for students. Provider is passing student info through context.
export default function StudentDetails() {
  const { id } = useParams();
  // query for finding individual student information
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  // mutation for deleting a student
  const [deleteStudent, { error }] = useMutation(DELETE_STUDENT);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  // function for deleting a student
  const deleteStudentFunc = async () => {
    await deleteStudent({ variables: { studentId: id } });
    alert("Student successfully deleted");
    setOpen(false);
  };

  return (
    <StudentContext.Provider value={{ student, practicePlans, id }}>
      <Sheet sx={styles.sheet}>
        {/* Main student details section  */}
        <StudentDetailsCard active={active} setActive={setActive} />
        <RegularModal open={open} onRequestClose={() => setOpen(false)}>
          <DeleteModalContent
            onRequestClose={() => setOpen(false)}
            confirmAction={() => deleteStudentFunc()}
            resourceName="student"
          />
        </RegularModal>
        <Button onClick={() => setOpen(true)} color="danger">
          Delete Student
        </Button>
      </Sheet>
    </StudentContext.Provider>
  );
}
