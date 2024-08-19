import useToken from "@/application/hooks/useToken";
import i18n from "@/application/translate/i18n";
import { AdminOutlet } from "@/interface/components/route/admin-outlet.component";
import { PrivateOutlet } from "@/interface/components/route/private-outlet.component";
import Layout from "@/interface/layout/index.tsx";
import { AdminEditProduct } from "@/interface/pages/admin-products.edit.page";
import AdminProducts from "@/interface/pages/admin-products.page";
import AdminRequests from "@/interface/pages/admin-requests.page";
import AdminScraping from "@/interface/pages/admin-scraping.page";
import Admin from "@/interface/pages/admin.page";
import Alerts from "@/interface/pages/alerts.page";
import Categories from "@/interface/pages/categories.page";
import { Conditions } from "@/interface/pages/conditions.page";
import Favorites from "@/interface/pages/favorites.page";
import Landing from "@/interface/pages/landing.page";
import Login from "@/interface/pages/login.page";
import { Privacy } from "@/interface/pages/privacy.page";
import ProductList from "@/interface/pages/product.list.page";
import Product from "@/interface/pages/product.page";
import Profile from "@/interface/pages/profile.page";
import Register from "@/interface/pages/register.page";
import { themeSettings } from "@/interface/theme/theme";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  useToken();

  const darkTheme = useMemo(() => createTheme(themeSettings), []);
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={1}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<Layout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="categories" element={<Categories />} />
                  <Route
                    path="categories/:id/products/"
                    element={<ProductList />}
                  />
                  <Route path="product/:id" element={<Product />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="conditions" element={<Conditions />} />
                  <Route element={<PrivateOutlet />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="alerts" element={<Alerts />} />
                  </Route>
                  <Route element={<AdminOutlet />}>
                    <Route path="admin" element={<Admin />} />
                    <Route path="admin/products" element={<AdminProducts />} />
                    <Route
                      path="admin/products/:id"
                      element={<AdminEditProduct />}
                    />
                    <Route path="admin/requests" element={<AdminRequests />} />
                    <Route path="admin/scraping" element={<AdminScraping />} />
                    <Route path="admin/configuration" element={<Admin />} />
                  </Route>
                </Route>
              </Routes>
            </Box>
          </ThemeProvider>
        </I18nextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
