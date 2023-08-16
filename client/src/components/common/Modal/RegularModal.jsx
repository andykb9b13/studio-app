import React from "react";
import { Modal, ModalDialog } from "@mui/joy";

export default function RegularModal({ open, onRequestClose, children }) {
  return (
    <React.Fragment>
      <Modal open={open} onClose={onRequestClose}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          {children}
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
