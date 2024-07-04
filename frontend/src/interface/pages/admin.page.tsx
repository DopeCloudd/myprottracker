import useFile from "@/application/hooks/useFile";
import { useGetBrandsQuery } from "@/infrastructure/api/brand.api";
import { useGetCategoriesQuery } from "@/infrastructure/api/category.api";
import { useAddProductMutation } from "@/infrastructure/api/product.api";
import Loading from "@/interface/components/global/Loading";
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
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

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
  const { enqueueSnackbar } = useSnackbar();
  const { file, handleRemoveFile } = useFile();
  const { data: categories, isLoading: categoriesLoad } =
    useGetCategoriesQuery();
  const { data: brands, isLoading: brandsLoad } = useGetBrandsQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (
      values: {
        url: string;
        category: string;
        brand: string;
      },
      { resetForm }
    ) => {
      if (file) {
        const formData = new FormData();
        const { url, category, brand } = values;
        formData.append("url", url);
        formData.append("brandId", brand);
        formData.append("categoryId", parseInt(category).toString());
        formData.append("image", file);
        try {
          const product = await addProduct(formData).unwrap();
          if (product) {
            resetForm();
            handleRemoveFile();
            enqueueSnackbar("Produit ajouté avec succès", {
              variant: "success",
            });
          }
        } catch (error) {
          enqueueSnackbar("Erreur lors de l'ajout du produit", {
            variant: "error",
          });
        }
      } else {
        enqueueSnackbar("Veuillez sélectionner une image", {
          variant: "error",
        });
      }
    },
  });

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
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  label="URL du produit"
                  type="string"
                  name="url"
                  value={formik.values.url}
                  error={
                    Boolean(formik.touched.url) && Boolean(formik.errors.url)
                  }
                  helperText={formik.touched.url && formik.errors.url}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Loading loading={categoriesLoad}>
                  <TextField
                    fullWidth
                    select
                    label="Catégorie du produit"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="category"
                    value={formik.values.category}
                    error={
                      Boolean(formik.touched.category) &&
                      Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  >
                    {categories?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Loading>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Loading loading={brandsLoad}>
                  <TextField
                    fullWidth
                    select
                    label="Marque du produit"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="brand"
                    value={formik.values.brand}
                    error={
                      Boolean(formik.touched.brand) &&
                      Boolean(formik.errors.brand)
                    }
                    helperText={formik.touched.brand && formik.errors.brand}
                  >
                    {brands?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Loading>
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload />
              </Grid>
              <Grid item xs={12}>
                <Loading loading={isLoading}>
                  <Button fullWidth variant="contained" type="submit">
                    Ajouter
                  </Button>
                </Loading>
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
