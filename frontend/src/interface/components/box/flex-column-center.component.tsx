import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexColumnCenter = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}) as typeof Box;

export default FlexColumnCenter;
