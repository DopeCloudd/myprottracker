import { LoginRequest } from "@/domain/entities/user.type";
import PasswordInput from "@/interface/components/input/password-input.component";
import { TextCopyright } from "@/interface/components/text/text-copyright.component";
import Loading from "@/interface/layout/loading.layout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "@/application/hooks/useAuth";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email requis"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(6, "Mot de passe trop court!"),
});

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm: React.FC = () => {
  const { login, isLoadingLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginRequest) => {
    const { email, password } = values;
    const user = await login(email, password);
    // Si on a bien un user, on redirige vers la dernière page visitée
    if (user) {
      // Get the last visited URL
      const lastVisited = localStorage.getItem("lastVisited") || "/";
      navigate(lastVisited, { replace: true });
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
        Connexion
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
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
            <Loading loading={[isLoadingLogin]}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
            </Loading>
            <Grid container>
              <Grid size={{ xs: 12 }}>
                <Link component={NavLink} to="/reset-password" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid size={{ xs: 12 }}>
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
