import React, { useContext, useEffect, useState } from "react";
import { Sheet } from "@mui/joy";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT } from "../../../utils/mutations";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import studentColDefs from "./studentColDefs";
import { useNavigate } from "react-router-dom";
import { MobileContext } from "../../../App";

// Component that displays quick information about each student in the database
const StudentDatabaseTable = ({ students, setStudents }) => {
  const [open, setOpen] = useState(false); // state for the modal to delete a student
  const [deleteStudent] = useMutation(DELETE_STUDENT); // mutation for deleting a student
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const navigate = useNavigate();
  const { isMobile } = useContext(MobileContext);

  // function for deleting a student
  const deleteStudentFunc = async (studentId) => {
    await deleteStudent({ variables: { studentId: studentId } });
    alert("Student successfully deleted");
    setOpen(false);
    setStudents(students.filter((student) => student._id !== studentId)); // filter out the deleted student from the displayed students
  };

  console.log(students);

  useEffect(() => {
    setRowData(students);
    setColDefs(
      studentColDefs({
        open: open,
        setOpen: setOpen,
        deleteStudentFunc: deleteStudentFunc,
        isMobile: isMobile,
      })
    );
  }, [students, open, setOpen, isMobile]);

  return (
    <Sheet id="studentDatabaseTableContainer">
      {/* Table for displaying the students */}
      <div
        className="ag-theme-quartz"
        style={{ height: 600, marginBottom: "50px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          onRowClicked={(params) =>
            navigate(`/teacher/studentDetails/${params.data._id}`)
          }
        ></AgGridReact>
      </div>
    </Sheet>
  );
};

export default StudentDatabaseTable;
