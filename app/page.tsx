import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Home() {
  return (
    <Stack
      sx={{
        height: "100dvh",
        minHeight: "100%",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 4,
      }}
    >
      <Typography component="h1" variant="h1">
        Taskify
      </Typography>

      <Typography>
        Manage your tasks efficiently and effectively with Taskify.
      </Typography>
    </Stack>
  );
}
