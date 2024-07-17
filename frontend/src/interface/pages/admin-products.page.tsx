import AdminAddProductForm from "@/interface/components/form/admin.add-product.form";
import TableProductList from "@/interface/components/table/product-list.table";
import { Box, Divider } from "@mui/material";
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
        <AdminAddProductForm />
        <Divider variant="middle" />
        <TableProductList />
      </Box>
    </Box>
  );
};

export default AdminProducts;
