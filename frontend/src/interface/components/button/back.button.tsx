import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // This navigates one step back in the browser's history
  };

  return (
    <Button
      onClick={handleBack}
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: "6px",
        fontWeight: "bold",
        mb: 4,
      }}
      startIcon={<ArrowBackIosIcon />}
    >
      Retour
    </Button>
  );
};

export default BackButton;
