import { Button } from "@mui/material";
import React from "react";

type Props = {
  content: string;
  onClick?: () => void;
};

const RequestButton: React.FC<Props> = ({ content, onClick }) => {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      {content}
    </Button>
  );
};

export default RequestButton;
