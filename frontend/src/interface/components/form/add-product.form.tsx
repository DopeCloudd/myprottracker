import { useAddProductMutation } from "@/infrastructure/api/product.api";
import Loading from "@/interface/layout/loading.layout";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  url: yup.string().required("Merci de renseigner l'URL du produit"),
});

const initialValues = {
  url: "",
};

const AddProductForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addProduct, { isLoading: addProductLoading }] =
    useAddProductMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (
      values: {
        url: string;
      },
      { resetForm }
    ) => {
      const formData = new FormData();
      formData.append("url", values.url);
      try {
        const product = await addProduct(formData).unwrap();
        if (product) {
          resetForm();
          enqueueSnackbar("Produit ajouté avec succès", {
            variant: "success",
          });
        }
      } catch (error) {
        enqueueSnackbar("Erreur lors de l'ajout du produit", {
          variant: "error",
        });
      }
    },
  });

  return (
    <Box>
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
              error={Boolean(formik.touched.url) && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
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
    </Box>
  );
};

export default AddProductForm;
