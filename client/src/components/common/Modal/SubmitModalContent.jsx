import React from "react";
import { Typography, Sheet, Button } from "@mui/joy";

const SubmitModalContent = ({ onRequestClose, message, success }) => {
  return (
    <React.Fragment>
      <Typography id="nested-modal-title" component="h2">
        {success ? "Success!" : "Error"}
      </Typography>
      <Typography id="nested-modal-description" textColor="text.tertiary">
        {message}
      </Typography>
      <Sheet
        sx={{
          mt: 1,
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row-reverse" },
        }}
      >
        <Button variant="outlined" color="neutral" onClick={onRequestClose}>
          Close
        </Button>
      </Sheet>
    </React.Fragment>
  );
};

export default SubmitModalContent;
