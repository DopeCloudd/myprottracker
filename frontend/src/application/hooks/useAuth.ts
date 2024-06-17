import { RootState } from "@/application/redux/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const authSlice = useSelector((state: RootState) => state.auth);

  return {
    user: userSlice,
    auth: authSlice,
  };
};

export default useAuth;
