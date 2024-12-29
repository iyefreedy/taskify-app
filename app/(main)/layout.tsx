"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SideMenu from "@/lib/ui/SideMenu";
import Navbar from "@/lib/ui/Navbar";
import Container from "@mui/material/Container";
import React from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { redirect } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user) {
    redirect("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Stack sx={{ width: "100%" }}>
        <Container>
          <Navbar />
          <Box
            component="main"
            sx={{
              width: "100%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}
