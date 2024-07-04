import { Box, CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  loading: boolean[];
}>;

export default function Loading({ loading, children }: Props) {
  if (loading.some((item) => item)) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 2,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return <>{children}</>;
}
