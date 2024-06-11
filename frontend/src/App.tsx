import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./interface/pages/Landing";
import Login from "./interface/pages/Login";
import { darkTheme } from "./interface/ui/theme";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
