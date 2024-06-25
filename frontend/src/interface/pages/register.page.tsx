import { Form } from "@/interface/components/global/Form";
import TextTitleOblique from "@/interface/components/text/text-title-oblique.component";
import { Box, Grid, Typography } from "@mui/material";

export default function Register() {
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
          <TextTitleOblique
            text="MY<span>PROT</span>TRACKER"
            sx={{ fontSize: "3rem" }}
          />
          <Typography component="h2" variant="body1">
            Votre coach nutrition personnel
          </Typography>
        </Box>
      </Grid>
      <Form type="register" />
    </Grid>
  );
}
