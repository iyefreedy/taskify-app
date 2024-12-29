"use client";

import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import SideMenu from "@/app/ui/SideMenu";
import Navbar from "@/app/ui/Navbar";
import Container from "@mui/material/Container";

export default function HomePage() {
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
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Overview
            </Typography>
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}
