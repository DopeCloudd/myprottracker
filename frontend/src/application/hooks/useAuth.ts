import { RootState } from "@/application/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return useMemo(() => ({ user }), [user]);
};
