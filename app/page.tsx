import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <>
      <Container>
        <Stack
          sx={{
            height: 80,
            minHeight: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Link href="/">
            <Image src="./taskify.svg" alt="Taskify" width={120} height={60} />
          </Link>

          <Stack direction="row" columnGap={4}>
            <Button LinkComponent={Link} href="/login">
              Login
            </Button>
            <Button LinkComponent={Link} variant="contained" href="/register">
              Register
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Container>
        <Stack
          component="main"
          sx={{
            paddingY: 8,
            alignItems: "center",
            justifyContent: "center",
            rowGap: 4,
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h1" color="primary">
            Simplify Your Tasks, Amplify Your Productivity!
          </Typography>

          <Typography>
            Manage your to-dos effortlessly with Taskify—your all-in-one task
            management solution. Plan, track, and accomplish your goals like
            never before.
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
