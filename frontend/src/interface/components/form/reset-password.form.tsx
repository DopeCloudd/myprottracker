import { TextCopyright } from "@/interface/components/text/text-copyright.component";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useSnackbar } from "notistack";
import { useAuth } from "@/application/hooks/useAuth";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email requis"),
});

const initialValues = {
  email: "",
};

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { resetPassword } = useAuth();

  const onSubmit = async (values: { email: string }) => {
    const { email } = values;
    const result = await resetPassword(email);
    if (result) {
      enqueueSnackbar("Email envoyé", { variant: "success" });
    } else {
      enqueueSnackbar("Erreur lors de la réinitialisation du mot de passe", {
        variant: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        mx: 4,
        width: "100%",
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
        <LockResetIcon sx={{ fill: "#00A656" }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Mot de passe oublié
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
            sx={{
              width: { xs: "90%", sm: "50%", md: "30%" },
              mt: 3,
            }}
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
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Réinitialiser le mot de passe
            </Button>
            <TextCopyright sx={{ mt: 5 }} />
          </Box>
        )}
      </Formik>
    </Box>
  );
};
