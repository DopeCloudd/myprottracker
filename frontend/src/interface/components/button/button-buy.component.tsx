import { Button } from "@mui/material";
import React from "react";

type Props = {
  content: string;
  onClick?: () => void;
};

const ButtonBuy: React.FC<Props> = ({ content, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: "6px",
        fontWeight: "bold",
        mt: 2,
        mb: 2,
      }}
    >
      {content}
    </Button>
  );
};

export default ButtonBuy;
