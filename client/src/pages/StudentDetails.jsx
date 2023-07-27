import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENT } from "../utils/queries";
import DeleteStudentModal from "../components/DeleteStudentModal";
import { Sheet, Typography } from "@mui/joy";
import StudentDetailsCard from "../components/StudentDetailsCard";

const styles = {
  sheet: {
    width: "90%",
    mx: "auto",
    backgroundColor: "lightblue",
    mt: 4,
    p: 2,
    borderRadius: "4px",
    boxShadow: "md",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    backgroundColor: "white",
    mx: "auto",
    width: "100%",
    p: 3,
    my: 2,
    borderRadius: "10px",
  },
};

// Creating student context to be passed to all components in this thread
export const StudentContext = createContext();

// Top component in the tree for students. Provider is passing student info through context.
export default function StudentDetails() {
  const { id } = useParams();
  const { data } = useQuery(QUERY_STUDENT, {
    variables: {
      studentId: id,
    },
  });

  const student = data?.student || [];
  const practicePlans = data?.student.practicePlans;

  return (
    <StudentContext.Provider value={{ student, practicePlans, id }}>
      <Sheet sx={styles.sheet}>
        <Typography level="h1" component="h1" mx="auto">
          Student Details
        </Typography>
        {/* Main student details section  */}
        <StudentDetailsCard />
        <DeleteStudentModal studentId={id} />
      </Sheet>
    </StudentContext.Provider>
  );
}
