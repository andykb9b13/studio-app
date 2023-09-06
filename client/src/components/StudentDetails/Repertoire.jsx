import React from "react";
import { Sheet, Typography, Table } from "@mui/joy";
import { styles } from "../../styles/studentDetailsStyles";
import { useStudentContext } from "../../utils/Context";

const Repertoire = () => {
  const { student } = useStudentContext();

  return (
    <Sheet sx={styles.card}>
      <Typography level="h2">Repertoire</Typography>
      <Table
        aria-label="basic table"
        stickyHeader
        stripe="even"
        variant="soft"
        sx={{
          borderRadius: "4px",
          boxShadow: "lg",
          p: 2,
          backgroundColor: "rgb(102, 46, 155, 0.2)",
        }}
      >
        <thead>
          <tr>
            <th>Piece</th>
            <th>Date Completed</th>
            <th>Type</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Sheet>
  );
};

export default Repertoire;
