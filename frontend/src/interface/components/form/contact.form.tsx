import { TextCopyright } from "@/interface/components/text/text-copyright.component";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Email requis"),
  sujet: yup
    .string()
    .required("Sujet requis")
    .min(3, "Sujet trop court")
    .max(100, "Sujet trop long"),
  message: yup
    .string()
    .required("Message requis")
    .min(10, "Message trop court")
    .max(1000, "Message trop long"),
});

const initialValues = {
  email: "",
  sujet: "",
  message: "",
};

export const ContactForm: React.FC = () => {
  const onSubmit = async (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: "#00A656",
        }}
      >
        <MailOutlineIcon sx={{ fill: "#00A656" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Connexion
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Sujet"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  name="sujet"
                  value={values.sujet}
                  error={Boolean(touched.sujet) && Boolean(errors.sujet)}
                  helperText={touched.sujet && errors.sujet}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  rows={4}
                  label="Message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  name="message"
                  value={values.message}
                  error={Boolean(touched.message) && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid>
                <Link component={NavLink} to="/" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid>
                <Link component={NavLink} to="/register" variant="body2">
                  {"Pas de compte ? S'inscrire"}
                </Link>
              </Grid>
            </Grid>
            <TextCopyright sx={{ mt: 5 }} />
          </Box>
        )}
      </Formik>
    </Box>
  );
};
