import useFile from "@/application/hooks/useFile";
import { useGetBrandsQuery } from "@/infrastructure/api/brand.api";
import { useGetCategoriesQuery } from "@/infrastructure/api/category.api";
import { useAddProductMutation } from "@/infrastructure/api/product.api";
import InputFileUpload from "@/interface/components/input/file-upload-input.component";
import Loading from "@/interface/layout/loading.layout";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
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
  calories: "",
  fat: "",
  saturedFat: "",
  fiber: "",
  sugar: "",
  carbohydrates: "",
  protein: "",
  salt: "",
};

const AdminAddProductForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { file, handleRemoveFile } = useFile();
  const { data: categories, isLoading: categoriesLoad } =
    useGetCategoriesQuery();
  const { data: brands, isLoading: brandsLoad } = useGetBrandsQuery();
  const [addProduct, { isLoading: addProductLoading }] =
    useAddProductMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (
      values: {
        url: string;
        category: string;
        brand: string;
        calories: string;
        fat: string;
        saturedFat: string;
        fiber: string;
        sugar: string;
        carbohydrates: string;
        protein: string;
        salt: string;
      },
      { resetForm }
    ) => {
      if (file) {
        const formData = new FormData();
        formData.append("url", values.url);
        formData.append("brandId", values.brand);
        formData.append("categoryId", parseInt(values.category).toString());
        formData.append("image", file);
        formData.append(
          "nutrition_values",
          JSON.stringify({
            calories: parseFloat(values.calories.replace(/,/g, ".")),
            fat: parseFloat(values.fat.replace(/,/g, ".")),
            saturedFat: parseFloat(values.saturedFat.replace(/,/g, ".")),
            carbohydrates: parseFloat(values.carbohydrates.replace(/,/g, ".")),
            fiber: parseFloat(values.fiber.replace(/,/g, ".")),
            protein: parseFloat(values.protein.replace(/,/g, ".")),
            salt: parseFloat(values.salt.replace(/,/g, ".")),
            sugar: parseFloat(values.sugar.replace(/,/g, ".")),
          })
        );
        console.log(formData);
        try {
          const product = await addProduct(formData).unwrap();
          console.log(product);
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
    <Box>
      <Loading loading={[categoriesLoad, brandsLoad]}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
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
                helperText={formik.touched.category && formik.errors.category}
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="brand"
                value={formik.values.brand}
                error={
                  Boolean(formik.touched.brand) && Boolean(formik.errors.brand)
                }
                helperText={formik.touched.brand && formik.errors.brand}
              >
                {brands?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kcal</InputAdornment>
                  ),
                }}
                label="Calories"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="calories"
                value={formik.values.calories}
                error={
                  Boolean(formik.touched.calories) &&
                  Boolean(formik.errors.calories)
                }
                helperText={formik.touched.calories && formik.errors.calories}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Matieres grasses"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="fat"
                value={formik.values.fat}
                error={
                  Boolean(formik.touched.fat) && Boolean(formik.errors.fat)
                }
                helperText={formik.touched.fat && formik.errors.fat}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Acides gras saturés"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="saturedFat"
                value={formik.values.saturedFat}
                error={
                  Boolean(formik.touched.saturedFat) &&
                  Boolean(formik.errors.saturedFat)
                }
                helperText={
                  formik.touched.saturedFat && formik.errors.saturedFat
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Fibres alimentaires"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="fiber"
                value={formik.values.fiber}
                error={
                  Boolean(formik.touched.fiber) && Boolean(formik.errors.fiber)
                }
                helperText={formik.touched.fiber && formik.errors.fiber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Sucres"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="sugar"
                value={formik.values.sugar}
                error={
                  Boolean(formik.touched.sugar) && Boolean(formik.errors.sugar)
                }
                helperText={formik.touched.sugar && formik.errors.sugar}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Glucides"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="carbohydrates"
                value={formik.values.carbohydrates}
                error={
                  Boolean(formik.touched.carbohydrates) &&
                  Boolean(formik.errors.carbohydrates)
                }
                helperText={
                  formik.touched.carbohydrates && formik.errors.carbohydrates
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Protéines"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="protein"
                value={formik.values.protein}
                error={
                  Boolean(formik.touched.protein) &&
                  Boolean(formik.errors.protein)
                }
                helperText={formik.touched.protein && formik.errors.protein}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">g</InputAdornment>
                  ),
                }}
                label="Sel"
                type="string"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="salt"
                value={formik.values.salt}
                error={
                  Boolean(formik.touched.salt) && Boolean(formik.errors.salt)
                }
                helperText={formik.touched.salt && formik.errors.salt}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFileUpload />
            </Grid>
            <Grid item xs={12}>
              <Loading loading={[addProductLoading]}>
                <Button fullWidth variant="contained" type="submit">
                  Ajouter
                </Button>
              </Loading>
            </Grid>
          </Grid>
        </Box>
      </Loading>
    </Box>
  );
};

export default AdminAddProductForm;
