import { Box, styled } from "@mui/material";

const GridProduct = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "50% 1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "0px",
  gridRowGap: "0px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr", // Pour les écrans moyens et plus petits
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr", // Pour les petits écrans
  },
})) as typeof Box;

export default GridProduct;
