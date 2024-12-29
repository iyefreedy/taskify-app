"use client";

import { useAuth } from "@/hooks/useAuth";
import { LoginCredential } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginContainer = styled(Stack)(({ theme }) => ({
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const { user, error, loading } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginCredential>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  if (user) {
    return redirect("/home");
  }

  return (
    <LoginContainer>
      <Card>
        <NextLink href="/">
          <Image src="./taskify.svg" alt="Taskify" width={100} height={50} />
        </NextLink>

        <Typography
          variant="h4"
          component="h1"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Login
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}
          onSubmit={onSubmit}
          noValidate
        >
          {error && <Alert severity="error">{error}</Alert>}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              size="small"
              autoComplete="email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              size="small"
              autoComplete="current-password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </FormControl>

          <Button type="submit" variant="contained" disabled={loading}>
            Login
          </Button>
        </Box>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>

        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link
            component={NextLink}
            href="/register"
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </LoginContainer>
  );
}
