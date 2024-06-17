import useAuth from "@/application/hooks/useAuth";
import { Status } from "@/domain/entities/status.type";
import TitleOblique from "@/interface/components/TitleOblique";
import { Form } from "@/interface/components/global/Form";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.status === Status.FULFILLED && user.data) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#121212",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <TitleOblique
            text="MY<span>PROT</span>TRACKER"
            sx={{ fontSize: "3rem" }}
          />
          <Typography
            component="h2"
            variant="body1"
            sx={{ fontFamily: "Integral, sans-serif" }}
          >
            Your personal fitness tracker
          </Typography>
        </Box>
      </Grid>
      <Form type="login" />
    </Grid>
  );
}
