import React from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";

export default function CongratsModal({ completedOpen, close, children }) {
  return (
    <React.Fragment>
      <Modal open={completedOpen} onClose={close}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.surface",
            }}
          />
          {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
