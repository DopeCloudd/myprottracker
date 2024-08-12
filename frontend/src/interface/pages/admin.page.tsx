import FlexCenter from "@/interface/components/box/flex-center.component";
import ProductList from "@/interface/components/table/product-list.table";
import RequestsTable from "@/interface/components/table/requests.table";
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
        gap: 2,
        px: { xs: 3, sm: 6 },
      }}
    >
      <FlexCenter
        sx={{
          gap: 2,
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
      </FlexCenter>
      <RequestsTable />
      <ProductList maxHeight={400} />
    </Box>
  );
};

export default Admin;
