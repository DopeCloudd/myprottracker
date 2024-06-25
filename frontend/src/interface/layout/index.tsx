import Footer from "@/interface/components/footer/footer.component";
import Navbar from "@/interface/components/nav/navbar.component";
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
