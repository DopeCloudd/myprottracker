import { RegisterRequest } from "@/domain/entities/user.type";
import PasswordInput from "@/interface/components/input/password-input.component";
import { TextCopyright } from "@/interface/components/text/text-copyright.component";
import Loading from "@/interface/layout/loading.layout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "@/application/hooks/useAuth";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(6, "Mot de passe trop court!"),
  confirmPassword: yup
    .string()
    .required("Confirmation du mot de passe requis")
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm: React.FC = () => {
  const { register, isLoadingRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterRequest) => {
    const { firstName, lastName, email, password } = values;
    const status = await register(firstName, lastName, email, password);
    if (status) {
      navigate("/login");
    }
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
      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          mt: 4,
          mr: 4,
          top: 0,
          right: 0,
        }}
        onClick={() => navigate("/")}
      >
        Accueil
      </Button>
      <Avatar
        sx={{
          m: 1,
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: "#00A656",
        }}
      >
        <LockOutlinedIcon sx={{ fill: "#00A656" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Inscription
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={registerSchema}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <PasswordInput
                  name="Mot de passe"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </Grid>
            <Loading loading={[isLoadingRegister]}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
            </Loading>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={NavLink} to="/login" variant="body2">
                  Déjà un compte ? Se connecter
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
