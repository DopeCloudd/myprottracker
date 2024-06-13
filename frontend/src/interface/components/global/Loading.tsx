import { Status } from "@/domain/entities/status.type";
import { Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  loading: Status;
  children: ReactNode;
};

export default function Loading({ loading, children }: Props) {
  if (loading === Status.LOADING) {
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
