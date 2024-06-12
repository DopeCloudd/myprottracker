import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import i18n from "./infrastructure/translate/i18n";
import Navbar from "./interface/components/Navbar";
import Landing from "./interface/pages/Landing";
import Login from "./interface/pages/Login";
import { themeSettings } from "./interface/ui/theme";

const queryClient = new QueryClient();

export default function App() {
  const darkTheme = useMemo(() => createTheme(themeSettings), []);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box>
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Landing />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
