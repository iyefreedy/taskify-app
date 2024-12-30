import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Header from "@/lib/ui/Header";

export default function Home() {
  return (
    <>
      <Header />
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
