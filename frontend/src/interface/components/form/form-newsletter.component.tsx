import useNewsletter from "@/application/hooks/useNewsletter";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email est requis"),
});

const FormNewsletter: React.FC = () => {
  const { addEmail } = useNewsletter();
  const onSubmit = async (values: { email: string }) => {
    const { email } = values;
    addEmail(email);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
          <Stack direction="row" spacing={1} useFlexGap>
            <TextField
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              aria-label="Entrer votre adresse email"
              placeholder="Votre adresse email"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Entrer votre adresse email",
              }}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email) && Boolean(errors.email)}
              value={values.email}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flexShrink: 0 }}
            >
              S'abonner
            </Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default FormNewsletter;
