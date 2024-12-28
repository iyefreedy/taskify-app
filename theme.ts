"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    typography: {
      fontFamily: "var(--font-plus-jakarta-sans)",
    },
  })
);

export default theme;