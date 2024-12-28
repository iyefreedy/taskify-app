"use client";

import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Image from "next/image";

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: "100dvh",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  width: "100%",
  margin: "auto",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),
  padding: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    maxWidth: 450,
  },
}));

export default function LoginPage() {
  return (
    <RegisterContainer>
      <Card>
        <NextLink href="/">
          <Image src="./taskify.svg" alt="Taskify" width={100} height={48} />
        </NextLink>
        <Typography
          variant="h4"
          component="h1"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Register
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}
          noValidate
        >
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField id="name" size="small" autoComplete="name" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              size="small"
              autoComplete="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              size="small"
              autoComplete="new-password"
            />
          </FormControl>

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>

        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            component={NextLink}
            href="/login"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign in
          </Link>
        </Typography>
      </Card>
    </RegisterContainer>
  );
}
