import { Box, CircularProgress } from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren<{
  loading: boolean[];
}>;

export default function Loading({ loading, children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allLoaded = loading.every((l) => !l);
    if (allLoaded) {
      const timeoutId = setTimeout(() => setIsLoading(false), 100); // Délai pour éviter le rendu intermédiaire
      return () => clearTimeout(timeoutId);
    } else {
      setIsLoading(true);
    }
  }, [loading]);

  if (isLoading) {
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
  } else {
    return <>{children}</>;
  }
}
