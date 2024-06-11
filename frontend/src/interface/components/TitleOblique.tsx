import { Typography } from "@mui/material";

type TitleObliqueProps = {
  fontSize?: string;
  onClick?: () => void;
};

export default function TitleOblique(props: TitleObliqueProps) {
  return (
    <Typography
      component="h1"
      variant="h2"
      sx={{
        fontFamily: "Integral Oblique, sans-serif",
        textTransform: "uppercase",
        fontSize: props.fontSize ?? "2rem",
        "& span": {
          color: "#00A656",
          fontFamily: "Integral Oblique, sans-serif",
          textTransform: "uppercase",
        },
      }}
      onClick={props.onClick}
    >
      MY<span>PROT</span>TRACKER
    </Typography>
  );
}
