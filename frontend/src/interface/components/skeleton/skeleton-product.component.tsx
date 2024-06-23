import { Box, Skeleton } from "@mui/material";
import React from "react";

export const SkeletonProduct: React.FC = () => {
  return (
    <>
      <Box>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={500}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.13)",
          }}
        />
      </Box>
      <Box>
        <Skeleton
          variant="rectangular"
          width={"60%"}
          height={200}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
        />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={300}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
        />
      </Box>
    </>
  );
};
