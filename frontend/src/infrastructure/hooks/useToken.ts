import { logout } from "@/domain/usecases/auth.slice";
import { fetchUser } from "@/domain/usecases/user.slice";
import { AppDispatch } from "@/infrastructure/store/store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        dispatch(fetchUser());
      } else {
        dispatch(logout());
      }
    }
  }, [dispatch]);
};

export default useToken;
