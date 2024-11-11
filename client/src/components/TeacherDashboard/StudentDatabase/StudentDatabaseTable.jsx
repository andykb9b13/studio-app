import React, { useEffect, useState } from "react";
import { Sheet } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../../../utils/mutations";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import studentColDefs from "./studentColDefs";
import { useNavigate } from "react-router-dom";

// Component that displays quick information about each student in the database
const StudentDatabaseTable = ({ students, setStudents }) => {
  const [isMobile, setIsMobile] = useState(false); // state for checking if the window width is less than or equal to 768px
  const [open, setOpen] = useState(false); // state for the modal to delete a student
  const [deleteStudent] = useMutation(DELETE_STUDENT); // mutation for deleting a student
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const navigate = useNavigate();

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

  console.log(students);

  useEffect(() => {
    setRowData(students);
    setColDefs(studentColDefs({ open, setOpen, deleteStudentFunc }));
  }, [students, open, setOpen]);

  return (
    <Sheet id="studentDatabaseTableContainer">
      {/* Table for displaying the students */}
      <div
        className="ag-theme-quartz"
        style={{ height: 500, marginBottom: "50px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onRowClicked={(params) =>
            navigate(`/teacher/studentDetails/${params.data._id}`)
          }
        ></AgGridReact>
      </div>
    </Sheet>
  );
};

export default StudentDatabaseTable;
