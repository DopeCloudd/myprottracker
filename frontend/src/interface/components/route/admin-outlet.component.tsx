import { useAuth } from "@/application/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AdminOutlet() {
  const { user } = useAuth();
  const location = useLocation();

  return user?.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
