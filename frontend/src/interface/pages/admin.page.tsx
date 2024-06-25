import InputFileUpload from "@/interface/components/input/file-upload-input.component";
import TableProductList from "@/interface/components/table/product-list.table.component";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const categories = [
  {
    value: "Whey",
    label: "Whey",
  },
  {
    value: "Gainer",
    label: "Gainer",
  },
];

const brand = [
  {
    value: "Bulk",
    label: "Bulk",
  },
  {
    value: "Eafit",
    label: "Eafit",
  },
];
const Admin: React.FC = () => {
  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box>
          <Typography component="h1" variant="h2" mb={2}>
            Ajouter un produit
          </Typography>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL du produit"
                  type="string"
                  name="url"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Catégorie du produit">
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Marque du produit">
                  {brand.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained">
                  Ajouter
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Box>
          <Typography component="h1" variant="h2" mb={2}>
            Liste des produits
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableProductList />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
