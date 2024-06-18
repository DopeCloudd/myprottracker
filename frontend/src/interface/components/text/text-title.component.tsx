import FlexCenter from "@/interface/components/box/flex-center.component";
import { Typography } from "@mui/material";
import DOMPurify from "dompurify";
import React from "react";

type TextTitleProps = {
  content: string;
};

const TextTitle: React.FC<TextTitleProps> = ({ content }) => {
  const sanitizedText = DOMPurify.sanitize(content).toUpperCase();

  return (
    <FlexCenter
      component="section"
      sx={{
        p: 6,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={{
          fontFamily: "Integral Oblique, sans-serif",
          fontSize: "clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem)",
          "& span": {
            color: "#00A656",
          },
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedText }}
      />
    </FlexCenter>
  );
};

export default TextTitle;
