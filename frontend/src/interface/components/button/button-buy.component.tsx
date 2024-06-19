import { Button } from "@mui/material";
import React from "react";

type Props = {
  content: string;
  type: "product" | "card";
  onClick?: () => void;
};

const ButtonBuy: React.FC<Props> = ({ content, type, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        width: type === "product" ? "100%" : "40%",
        borderRadius: "6px",
        fontWeight: "bold",
        mt: type === "product" ? 2 : 0,
        mb: type === "product" ? 2 : 0,
        mr: type === "product" ? 0 : 2,
      }}
    >
      {content}
    </Button>
  );
};

export default ButtonBuy;
