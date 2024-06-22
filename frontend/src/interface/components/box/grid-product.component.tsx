import { Box, styled } from "@mui/material";

const GridProduct = styled(Box)({
  display: "grid",
  gridTemplateColumns: "50% 1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "0px",
  gridRowGap: "0px",
}) as typeof Box;

export default GridProduct;
