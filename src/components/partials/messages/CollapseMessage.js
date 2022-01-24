import React from "react";

import { Alert, Collapse, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CollapseMessage({ message, open, setCollapseMsg }) {
  console.log("entro al collapse");
  console.log(open);

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setCollapseMsg(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        variant="filled"
        severity="error"
      >
        {message}
      </Alert>
    </Collapse>
  );
}

export function ToastMessage({ open, setCollapseMsg, message }) {

  const state = {
    vertical: "top",
    horizontal: "center",
  };

  const { vertical, horizontal } = state;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      onClose={() => setCollapseMsg(false)}
      key={vertical + horizontal}
    >
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setCollapseMsg(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        variant="filled"
        severity="error"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
