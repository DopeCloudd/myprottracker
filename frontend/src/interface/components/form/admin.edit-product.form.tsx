import { Brand } from "@/domain/entities/brand.type";
import { Category } from "@/domain/entities/category.types";
import { Product } from "@/domain/entities/product.type";
import InputFileUpload from "@/interface/components/input/file-upload-input.component";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  url: yup.string().required("Merci de renseigner l'URL du produit"),
  category: yup
    .string()
    .required("Merci de renseigner la catégorie du produit"),
  brand: yup.string().required("Merci de renseigner la marque du produit"),
});

const AdminEditProductForm: React.FC<{
  product: Product | undefined;
  categories: Category[] | undefined;
  brands: Brand[] | undefined;
}> = ({ product, categories, brands }) => {
  const onSubmit = async (values: {
    url: string;
    category: string;
    brand: string;
  }) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography component="h1" variant="h2" mb={2}>
        Édition d'un produit
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          url: product?.url || "",
          category: product?.category.id.toString() || "",
          brand: product?.brand.id.toString() || "",
          image: product?.image || "",
        }}
        validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="URL du produit"
                  type="string"
                  name="url"
                  value={values.url}
                  error={Boolean(touched.url) && Boolean(errors.url)}
                  helperText={touched.url && errors.url}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Catégorie du produit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="category"
                  value={values.category}
                  error={Boolean(touched.category) && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                >
                  {categories?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Marque du produit"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="brand"
                  value={values.brand}
                  error={Boolean(touched.brand) && Boolean(errors.brand)}
                  helperText={touched.brand && errors.brand}
                >
                  {brands?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kcal</InputAdornment>
                    ),
                  }}
                  label="Calories"
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                  label="Matieres grasses"
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                  label="Glucides"
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                  label="Fibres alimentaires"
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                  label="Protéines"
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">g</InputAdornment>
                    ),
                  }}
                  label="Sel"
                  type="string"
                />
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default AdminEditProductForm;
