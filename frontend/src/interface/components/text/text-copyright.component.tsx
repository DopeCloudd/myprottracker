import { Link, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface CopyrightProps {
  sx?: SxProps<Theme>;
}

export const TextCopyright: React.FC<CopyrightProps> = ({ sx }) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {"Copyright © "}
      <Link href="https://mui.com/">Myprottracker&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
};
