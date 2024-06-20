import Footer from "@/interface/components/Footer";
import Navbar from "@/interface/components/Navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: "1 0 auto",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
