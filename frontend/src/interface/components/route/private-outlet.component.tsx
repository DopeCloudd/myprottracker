import { useAuth } from "@/application/hooks/useAuth";
import FlexCenter from "@/interface/components/box/flex-center.component";
import { CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PrivateOutlet() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <FlexCenter flex={1}>
        <CircularProgress />
      </FlexCenter>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
