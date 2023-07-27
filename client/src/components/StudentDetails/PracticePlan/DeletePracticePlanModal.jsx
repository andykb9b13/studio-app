import React from "react";
import {
  Sheet,
  Button,
  Modal,
  ModalDialog,
  Typography,
  IconButton,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_PRACTICE_PLAN } from "../../../utils/mutations";

export default function DeletePracticePlanModal({ planId }) {
  const [deletePracticePlan, { error }] = useMutation(DELETE_PRACTICE_PLAN);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
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
          <Typography id="nested-modal-title" component="h2">
            Are you absolutely sure?
          </Typography>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            This action cannot be undone. This will permanently delete the
            practice plan and remove the data from our servers.
          </Typography>
          <Sheet
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button
              variant="solid"
              color="neutral"
              onClick={async () => {
                await deletePracticePlan({
                  variables: { planId: planId },
                });
                setOpen(false);
              }}
            >
              Continue
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
