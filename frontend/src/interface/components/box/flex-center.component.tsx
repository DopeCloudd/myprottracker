import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexCenter = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}) as typeof Box;

export default FlexCenter;
