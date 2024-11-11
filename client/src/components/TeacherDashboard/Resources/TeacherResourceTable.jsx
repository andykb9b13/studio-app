import React, { useContext, useEffect, useState } from "react";
import { Sheet } from "@mui/joy";
import { sortResources } from "../../../utils/utilities";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import teacherResourceColDefs from "./teacherResourceColDefs";
import { MobileContext } from "../../../App";

// Component for displaying the resources a teacher has created in a table
const TeacherReasourceTable = ({
  deleteResourceFunc,
  resources,
  open,
  setOpen,
}) => {
  const [sortedResources, setSortedResources] = useState(); // state for the resources to be sorted
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const { isMobile } = useContext(MobileContext);

  useEffect(() => {
    setRowData(resources);
    setColDefs(
      teacherResourceColDefs({
        open: open,
        setOpen: setOpen,
        deleteResourceFunc: deleteResourceFunc,
        isMobile: isMobile,
      })
    );
  }, [resources, open, setOpen, deleteResourceFunc, isMobile]);

  // sort the resources when the resources prop changes
  useEffect(() => {
    setSortedResources(sortResources(resources));
  }, [resources]);

  return (
    <Sheet>
      <div
        className="ag-theme-quartz"
        style={{ height: 500, marginBottom: "50px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        ></AgGridReact>
      </div>
    </Sheet>
  );
};

export default TeacherReasourceTable;
