import useFile from "@/application/hooks/useFile";
import { Brand } from "@/domain/entities/brand.type";
import { Category } from "@/domain/entities/category.types";
import { Product } from "@/domain/entities/product.type";
import { useUpdateProductMutation } from "@/infrastructure/api/product.api";
import InputFileUpload from "@/interface/components/input/file-upload-input.component";
import Loading from "@/interface/layout/loading.layout";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
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
  product: Product;
  categories: Category[];
  brands: Brand[];
}> = ({ product, categories, brands }) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { file, addFile } = useFile();
  addFile(product.image.data, product.image.type, product.title);

  const onSubmit = async (values: {
    url: string;
    category: string;
    brand: string;
    rating: number | null;
    calories: number | null;
    fat: number | null;
    saturedFat: number | null;
    fiber: number | null;
    sugar: number | null;
    carbohydrates: number | null;
    protein: number | null;
    salt: number | null;
  }) => {
    if (product) {
      const formData = new FormData();
      formData.append("url", values.url);
      formData.append("categoryId", values.category);
      formData.append("brandId", values.brand);
      formData.append("rating", values.rating?.toString() || "");
      if (file) {
        formData.append("image", file);
      }
      formData.append(
        "nutrition_values",
        JSON.stringify({
          calories: values.calories,
          fat: values.fat,
          saturedFat: values.saturedFat,
          fiber: values.fiber,
          sugar: values.sugar,
          carbohydrates: values.carbohydrates,
          protein: values.protein,
          salt: values.salt,
        })
      );
      const updatedProduct = await updateProduct({
        id: product.id,
        formData,
      }).unwrap();
      console.log(updatedProduct);
    }
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
          rating: product?.rating || null,
          image: product?.image || "",
          calories: product?.nutrition[0]?.calories || null,
          fat: product?.nutrition[0]?.fat || null,
          saturedFat: product?.nutrition[0]?.saturedFat || null,
          fiber: product?.nutrition[0]?.fiber || null,
          sugar: product?.nutrition[0]?.sugar || null,
          carbohydrates: product?.nutrition[0]?.carbohydrates || null,
          protein: product?.nutrition[0]?.protein || null,
          salt: product?.nutrition[0]?.salt || null,
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
              <Grid size={{ xs: 12 }}>
                <Typography component="h2" variant="h4">
                  Informations générales
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  precision={0.5}
                  value={values.rating}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Divider />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography component="h2" variant="h4">
                  Informations nutritionnelles
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: (
                      <InputAdornment position="start">kcal</InputAdornment>
                    ),
                  }}
                  label="Calories"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="calories"
                  value={values.calories}
                  error={Boolean(touched.calories) && Boolean(errors.calories)}
                  helperText={touched.calories && errors.calories}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Matieres grasses"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="fat"
                  value={values.fat}
                  error={Boolean(touched.fat) && Boolean(errors.fat)}
                  helperText={touched.fat && errors.fat}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Acides gras saturés"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="saturedFat"
                  value={values.saturedFat}
                  error={
                    Boolean(touched.saturedFat) && Boolean(errors.saturedFat)
                  }
                  helperText={touched.saturedFat && errors.saturedFat}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Fibres alimentaires"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="fiber"
                  value={values.fiber}
                  error={Boolean(touched.fiber) && Boolean(errors.fiber)}
                  helperText={touched.fiber && errors.fiber}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Sucres"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="sugar"
                  value={values.sugar}
                  error={Boolean(touched.sugar) && Boolean(errors.sugar)}
                  helperText={touched.sugar && errors.sugar}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Glucides"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="carbohydrates"
                  value={values.carbohydrates}
                  error={
                    Boolean(touched.carbohydrates) &&
                    Boolean(errors.carbohydrates)
                  }
                  helperText={touched.carbohydrates && errors.carbohydrates}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Protéines"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="protein"
                  value={values.protein}
                  error={Boolean(touched.protein) && Boolean(errors.protein)}
                  helperText={touched.protein && errors.protein}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  slotProps={{
                    input: <InputAdornment position="start">g</InputAdornment>,
                  }}
                  label="Sel"
                  type="string"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="salt"
                  value={values.salt}
                  error={Boolean(touched.salt) && Boolean(errors.salt)}
                  helperText={touched.salt && errors.salt}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <InputFileUpload />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Loading loading={[isLoading]}>
                  <Button fullWidth variant="contained" type="submit">
                    Valider
                  </Button>
                </Loading>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default AdminEditProductForm;
