import TextTitleOblique from "@/interface/components/text/text-title-oblique.component";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LoginForm } from "@/interface/components/form/login.form";

export default function Login() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        size={{ xs: false, sm: 4, md: 7 }}
        sx={{
          display: { xs: "none", sm: "block" },
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
          <TextTitleOblique
            text="MY<span>PROT</span>TRACKER"
            sx={{ fontSize: "3rem" }}
          />
          <Typography component="h2" variant="body1">
            Votre coach nutrition personnel
          </Typography>
        </Box>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8, md: 5 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
        }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
}
