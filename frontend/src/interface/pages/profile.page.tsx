import { useAuth } from "@/application/hooks/useAuth";
import { PlanType } from "@/domain/entities/plan.types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TextTitle from "../components/text/text-title.component";

const plans = [PlanType.FREE, PlanType.POWER, PlanType.MUSCLE, PlanType.PRO];

const Profile: React.FC = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ px: 6 }}>
      <TextTitle content="Profil" />
      <Typography variant="h3" sx={{ mb: 2 }}>
        Informations personnelles
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={user?.email}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="firstName"
            label="Prénom"
            value={user?.firstName}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Abonnement</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user?.subscription || "Starter"}
              label="Abonnement"
              readOnly
            >
              {plans.map((plan) => (
                <MenuItem value={plan}>{plan}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="warning" fullWidth>
            Modifier
          </Button>
          <Button variant="outlined" color="error" fullWidth>
            Annuler
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
