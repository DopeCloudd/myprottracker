import AdminAddProductForm from "@/interface/components/form/admin.add-product.form";
import TableProductList from "@/interface/components/table/product-list.table";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import React from "react";

const AdminProducts: React.FC = () => {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Ajouter un produit
          </AccordionSummary>
          <AccordionDetails>
            <AdminAddProductForm />
          </AccordionDetails>
        </Accordion>
        <Divider variant="middle" />
        <TableProductList />
      </Box>
    </Box>
  );
};

export default AdminProducts;
