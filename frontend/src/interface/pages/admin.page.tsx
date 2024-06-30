import useFile from "@/application/hooks/useFile";
import { useAddProductMutation } from "@/infrastructure/api/product.api";
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
import { Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

const categories = [
  {
    value: 1,
    label: "Whey",
  },
  {
    value: 2,
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

const schema = yup.object().shape({
  url: yup.string().required("Merci de renseigner l'URL du produit"),
  category: yup
    .string()
    .required("Merci de renseigner la catégorie du produit"),
  brand: yup.string().required("Merci de renseigner la marque du produit"),
});

const initialValues = {
  url: "",
  category: "",
  brand: "",
};

const Admin: React.FC = () => {
  const { file } = useFile();
  const [addProduct] = useAddProductMutation();

  const onSubmit = async (values: {
    url: string;
    category: string;
    brand: string;
  }) => {
    const { url, category, brand } = values;
    console.log(file);
    if (file) {
      const product = await addProduct({
        url,
        categoryId: parseInt(category),
        brand,
        image: file,
      });
      console.log(product);
    } else {
      enqueueSnackbar("Veuillez sélectionner une image", {
        variant: "error",
      });
    }
  };

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
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Catégorie du produit"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="category"
                      value={values.category}
                      error={
                        Boolean(touched.category) && Boolean(errors.category)
                      }
                      helperText={touched.category && errors.category}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                    <Button fullWidth variant="contained" type="submit">
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
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
