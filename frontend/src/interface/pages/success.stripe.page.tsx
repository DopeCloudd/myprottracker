import { useAuth } from "@/application/hooks/useAuth";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SuccessStripe: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6 },
      }}
    >
      <TextTitle content="Annulation du paiement" />
      <Typography fontSize={"1.5rem"}>
        Merci pour votre abonnement et bienvenue dans notre salle 🥳
        <br />
        Si votre abonnement n'est pas encore actif, n'hésitez pas à actualiser
        la page.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/profile");
        }}
      >
        Aller dans mon vestiaire
      </Button>
    </Box>
  );
};

export default SuccessStripe;
