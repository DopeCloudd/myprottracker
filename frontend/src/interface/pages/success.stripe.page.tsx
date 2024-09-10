import { useAuth } from "@/application/hooks/useAuth";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box, Button, Typography, Avatar } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: "#00A656",
        }}
      >
        <CheckIcon sx={{ fill: "#00A656" }} />
      </Avatar>
      <TextTitle content="Paiement réussi" />
      <Typography fontSize={"1.5rem"} textAlign={"center"}>
        Merci pour votre abonnement et bienvenue dans notre salle 🥳
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
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
