import { Button } from "@mui/material";
import React from "react";

type Props = {
  content: string;
  onClick?: () => void;
};

const HistoryButton: React.FC<Props> = ({ content, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="warning"
      sx={{
        width: "100%",
        borderRadius: "6px",
        fontWeight: "bold",
        mt: 2,
      }}
    >
      {content}
    </Button>
  );
};

export default HistoryButton;
