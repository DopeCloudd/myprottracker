import Grid from "@mui/material/Grid2";
import { ResetPasswordForm } from "@/interface/components/form/reset-password.form";

export default function ResetPassword() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        size={{ xs: 12 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
        }}
      >
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
}
