import React from "react";

import { ThemeProvider, CardHeader, Avatar, createTheme } from "@mui/material";

import logo from "../../logo.svg";

export default function CHeader({ title = "Sign in" }) {
  const themeHeader = createTheme({
    components: {
      // Name of the component
      MuiCardHeader: {
        styleOverrides: {
          // Name of the slot
          avatar: {
            // Some CSS
            margin: 0,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={themeHeader}>
      <CardHeader
        avatar={<Avatar src={logo} sx={{ height: 56, width: 56 }} />}
        title={title}
        titleTypographyProps={{ fontSize: "1.5rem", textAlign: "center" }}
        subheader="Use your Digimentore account"
        subheaderTypographyProps={{ variant: "subtitle1" }}
        sx={{ flexDirection: "column" }}
      />
    </ThemeProvider>
  );
}
