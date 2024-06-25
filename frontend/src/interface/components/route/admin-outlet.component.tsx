import { useAuth } from "@/application/hooks/useAuth";
import FlexCenter from "@/interface/components/box/flex-center.component";
import { CircularProgress } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AdminOutlet() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <FlexCenter flex={1}>
        <CircularProgress />
      </FlexCenter>
    );
  }

  return user?.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
