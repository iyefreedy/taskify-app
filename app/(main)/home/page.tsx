"use client";

import { useAuth } from "@/hooks/useAuth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { handleLogout, user } = useAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Typography>Welcome, {user!.name}</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
