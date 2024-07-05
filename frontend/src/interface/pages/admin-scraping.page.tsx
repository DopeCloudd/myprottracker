import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

const AdminScraping: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        px: 6,
      }}
    >
      <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
        Scraping des nouveaux produits
      </Button>
      <Button variant="outlined" startIcon={<LanguageIcon />}>
        Scraping de tout les produits
      </Button>
      <Button variant="outlined" startIcon={<SettingsIcon />}>
        Scraping de certains produits
      </Button>
    </Box>
  );
};

export default AdminScraping;
