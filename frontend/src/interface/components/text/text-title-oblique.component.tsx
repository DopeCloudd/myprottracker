import { SxProps, Theme, Typography } from "@mui/material";
import DOMPurify from "dompurify";

type TitleObliqueProps = {
  sx?: SxProps<Theme>;
  text: string;
  onClick?: () => void;
};

export default function TextTitleOblique(props: TitleObliqueProps) {
  const sanitizedText = DOMPurify.sanitize(props.text);

  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{
        fontFamily: "Integral Oblique, sans-serif",
        textTransform: "uppercase",
        ...props.sx,
        "& span": {
          color: "#00A656",
          fontFamily: "Integral Oblique, sans-serif",
          textTransform: "uppercase",
        },
      }}
      onClick={props.onClick}
      dangerouslySetInnerHTML={{ __html: sanitizedText }}
    />
  );
}
