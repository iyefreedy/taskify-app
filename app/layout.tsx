import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/lib/context/AuthContext";

export const metadata: Metadata = {
  title: "Taskify",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline enableColorScheme />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
