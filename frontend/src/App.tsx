import useToken from "@/infrastructure/hooks/useToken";
import i18n from "@/infrastructure/translate/i18n";
import Layout from "@/interface/layout";
import Landing from "@/interface/pages/Landing";
import Login from "@/interface/pages/Login";
import Register from "@/interface/pages/Register";
import { themeSettings } from "@/interface/ui/theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

export default function App() {
  useToken();

  const darkTheme = useMemo(() => createTheme(themeSettings), []);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Landing />
                    </Layout>
                  }
                />
              </Routes>
            </Box>
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
