import { logout, refreshToken } from "@/application/redux/slices/auth.slice";
import { useAppDispatch } from "@/application/redux/store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const useToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        dispatch(refreshToken(token));
      } else {
        dispatch(logout());
      }
    }
  }, [dispatch]);
};

export default useToken;
