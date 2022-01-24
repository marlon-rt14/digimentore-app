import React from "react";

import { Alert } from "@mui/material";

const initialSM = {
  open: false,
  message: "",
  severity: "",
};

export default function StaticMessage({
  setStaticMsg,
  message,
  severity,
  strong,
}) {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Alert
        onClose={() => {
          setStaticMsg(initialSM);
        }}
        severity={severity}
      >
        {message}
        {strong && <strong>{strong}.</strong>}
      </Alert>
    </div>
  );
}
