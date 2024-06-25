import {
  logout,
  setCredentials,
  setLoading,
} from "@/application/redux/slices/auth.slice";
import { useAppDispatch } from "@/application/redux/store";
import { useRefreshTokenMutation } from "@/infrastructure/api/auth.api";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const useToken = () => {
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          const user = await refreshToken(token).unwrap();
          dispatch(setCredentials(user));
        } else {
          dispatch(logout());
        }
      }
      dispatch(setLoading(false));
    };

    verifyToken();
  }, [dispatch, refreshToken]);
};

export default useToken;
