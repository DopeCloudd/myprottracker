import {
  loadingCurrentUser,
  selectCurrentUser,
} from "@/application/redux/slices/auth.slice";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(loadingCurrentUser);

  return useMemo(() => ({ user, loading }), [user, loading]);
};
