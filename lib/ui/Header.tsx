import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function Header() {
  return (
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
  );
}
