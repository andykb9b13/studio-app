import React, { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import teacherPieceColDefs from "./teacherPieceColDefs";

// Component that displays the teacher's pieces in a table
const TeacherPieceTable = ({ teacherPieces, isMobile }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    setRowData(teacherPieces);
    setColDefs(teacherPieceColDefs({ isMobile }));
  }, [teacherPieces, isMobile]);

  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{ height: 300, marginBottom: "50px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        ></AgGridReact>
      </div>
    </>
  );
};

export default TeacherPieceTable;
