import { login, register } from "@/application/redux/slices/auth.slice";
import { RootState, useAppDispatch } from "@/application/redux/store";
import { RegisterUser } from "@/domain/entities/user.type";
import { Copyright } from "@/interface/components/Copyright";
import Loading from "@/interface/components/global/Loading";
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
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email("Email required").required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().required("Password required").min(6, "Too short!"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type FormProps = {
  type: "register" | "login";
};

export const Form = (props: FormProps) => {
  const loading = useSelector((state: RootState) => state.auth.loading);
  const { type } = props;
  const isLogin = type === "login";
  const isRegister = type === "register";

  const dispatch = useAppDispatch();

  const onSubmit = async (values: RegisterUser) => {
    const { firstName, lastName, email, password } = values;
    if (isLogin) {
      try {
        dispatch(login({ email, password }));
      } catch (error) {
        console.log(error);
      }
    } else if (isRegister) {
      try {
        dispatch(register({ firstName, lastName, email, password }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171717",
      }}
    >
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
          <LockOutlinedIcon sx={{ fill: "#00A656" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign in" : "Sign up"}
        </Typography>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={isLogin ? loginSchema : registerSchema}
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
                {isRegister && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        error={
                          Boolean(touched.firstName) &&
                          Boolean(errors.firstName)
                        }
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        error={
                          Boolean(touched.lastName) && Boolean(errors.lastName)
                        }
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                  </>
                )}
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
                  <TextField
                    fullWidth
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </Grid>
              </Grid>
              <Loading loading={loading}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLogin ? "Login" : "Register"}
                </Button>
              </Loading>
              {isLogin ? (
                <Grid container>
                  <Grid item xs>
                    <Link component={NavLink} to="/" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={NavLink} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              ) : (
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link component={NavLink} to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};
