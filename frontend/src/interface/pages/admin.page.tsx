import LanguageIcon from "@mui/icons-material/Language";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        px: { xs: 3, sm: 6 },
      }}
    >
      <Button
        variant="contained"
        endIcon={<ShoppingCartIcon />}
        onClick={() => navigate("products")}
      >
        Produits
      </Button>
      <Button
        variant="contained"
        endIcon={<LanguageIcon />}
        onClick={() => navigate("scraping")}
      >
        Scraping
      </Button>
      <Button
        variant="contained"
        endIcon={<QuestionMarkIcon />}
        onClick={() => navigate("requests")}
      >
        Demandes
      </Button>
      <Button
        variant="contained"
        endIcon={<SettingsIcon />}
        onClick={() => navigate("configuration")}
      >
        Configuration
      </Button>
    </Box>
  );
};

export default Admin;
