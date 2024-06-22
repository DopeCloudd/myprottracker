import { Typography } from "@mui/material";
import React from "react";

type TextTitleProps = {
  content: string;
};

const TextProductSection: React.FC<TextTitleProps> = ({ content }) => {
  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{
        width: "fit-content",
        borderBottom: "3px solid #00a656",
        fontSize: "clamp(1.375rem, 0.9063rem + 1.25vw, 2rem)",
        mb: 2,
      }}
    >
      {content}
    </Typography>
  );
};

export default TextProductSection;
