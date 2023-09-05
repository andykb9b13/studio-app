import React from "react";
import { Sheet } from "@mui/joy";

const AddModalContent = ({ children }) => {
  return (
    <React.Fragment>
      <Sheet
        sx={{
          mt: 1,
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row-reverse" },
        }}
      >
        {children}
      </Sheet>
    </React.Fragment>
  );
};

export default AddModalContent;
