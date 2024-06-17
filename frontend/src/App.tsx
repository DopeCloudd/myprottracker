import useToken from "@/application/hooks/useToken";
import i18n from "@/application/translate/i18n";
import Layout from "@/interface/layout";
import Categories from "@/interface/pages/categories.page";
import Landing from "@/interface/pages/landing.page";
import Login from "@/interface/pages/login.page";
import ProductList from "@/interface/pages/product.list.page";
import Product from "@/interface/pages/product.page";
import Register from "@/interface/pages/register.page";
import { themeSettings } from "@/interface/theme/theme";
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
                <Route
                  path="/categories"
                  element={
                    <Layout>
                      <Categories />
                    </Layout>
                  }
                />
                <Route
                  path="/catgories/:id/products/"
                  element={
                    <Layout>
                      <ProductList />
                    </Layout>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <Layout>
                      <Product />
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
