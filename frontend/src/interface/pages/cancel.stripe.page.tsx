import { useAuth } from "@/application/hooks/useAuth";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CancelStripe: React.FC = () => {
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
        Vous avez annulé le paiement 🥲
        <br />
        Si vous hésitez encore à prendre votre coach nutrition personnel 🏋️,
        parcourez encore notre application et laissez vous convaincre par notre
        expertise.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Retour aux vestiaires
      </Button>
    </Box>
  );
};

export default CancelStripe;
