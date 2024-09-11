import { useAuth } from "@/application/hooks/useAuth";
import { PlanType } from "@/domain/entities/plan.types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import TextTitle from "../components/text/text-title.component";

const plans = [PlanType.FREE, PlanType.PREMIUM];

const Profile: React.FC = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ px: 6 }}>
      <TextTitle content="Profil" />
      <Typography variant="h3" sx={{ mb: 2 }}>
        Informations personnelles
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={user?.email}
            disabled
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            id="firstName"
            label="Prénom"
            value={user?.firstName}
            disabled
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            id="lastName"
            label="Nom"
            value={user?.lastName}
            disabled
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h3" sx={{ mb: 2 }}>
        Abonnement
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Abonnement</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user?.plan || "Starter"}
              label="Abonnement"
              readOnly
            >
              {plans.map((plan) => (
                <MenuItem key={plan} value={plan}>
                  {plan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            sx={{
              height: "100%",
            }}
            onClick={() => {
              window.location.href =
                "https://billing.stripe.com/p/login/test_6oE29ae6t7ji1oIeUU";
            }}
          >
            Gérer mon abonnement
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
