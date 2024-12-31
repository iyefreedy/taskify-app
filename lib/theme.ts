"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { grey, common } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    typography: {
      fontFamily: plusJakartaSans.style.fontFamily,
    },
    palette: {
      background: {
        default: grey[100],
        paper: common.white,
      },
    },
  })
);

export default theme;
