import React from "react";
import { Typography, Sheet, Button } from "@mui/joy";

const DeleteModalContent = ({
  confirmAction,
  onRequestClose,
  resourceName,
}) => {
  return (
    <React.Fragment>
      <Typography id="nested-modal-title" component="h2">
        Are you absolutely sure?
      </Typography>
      <Typography id="nested-modal-description" textColor="text.tertiary">
        This action cannot be undone. This will permanently delete the{" "}
        <b>{resourceName}</b> {""}and remove the data from our servers.
      </Typography>
      <Sheet
        sx={{
          mt: 1,
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row-reverse" },
        }}
      >
        <Button variant="solid" color="neutral" onClick={confirmAction}>
          Continue
        </Button>
        <Button variant="outlined" color="neutral" onClick={onRequestClose}>
          Cancel
        </Button>
      </Sheet>
    </React.Fragment>
  );
};

export default DeleteModalContent;
