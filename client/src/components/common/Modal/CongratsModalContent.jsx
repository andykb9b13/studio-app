import React from "react";
import { Typography, Sheet, Button } from "@mui/joy";

const CongratsModalContent = ({
  confirmAction,
  close,
  points,
  resourceName,
}) => {
  return (
    <React.Fragment>
      <Typography id="nested-modal-title" component="h2">
        CONGRATULATIONS!!!
      </Typography>
      <Typography id="nested-modal-description" textColor="text.tertiary">
        You completed the{" "}
        <b>
          {""}
          {resourceName}
          {""}
        </b>{" "}
        assignment and earned <b>{points}</b> points!
      </Typography>
      <Sheet
        sx={{
          mt: 1,
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row-reverse" },
        }}
      >
        <Button variant="outlined" color="neutral" onClick={close}>
          Close
        </Button>
      </Sheet>
    </React.Fragment>
  );
};

export default CongratsModalContent;
