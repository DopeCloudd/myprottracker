import {
  loadingCurrentUser,
  selectCurrentUser,
} from "@/application/redux/slices/auth.slice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} from "@/infrastructure/api/auth.api";
import { useAppDispatch } from "@/application/redux/store";
import { setCredentials } from "@/application/redux/slices/auth.slice";
import { useSnackbar } from "notistack";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(loadingCurrentUser);

  const [loginCall, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [registerCall, { isLoading: isLoadingRegister }] =
    useRegisterMutation();
  const [resetPasswordCall, { isLoading: isLoadingResetPassword }] =
    useResetPasswordMutation();

  const login = async (email: string, password: string) => {
    try {
      const user = await loginCall({ email, password }).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem("token", user.token);
      return user;
    } catch (error) {
      enqueueSnackbar("Adresse email ou mot de passe incorrect.", {
        variant: "error",
      });
      return false;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const status = await registerCall({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      if (status.success) {
        enqueueSnackbar("Inscription réussie", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar(
          "Erreur lors de l'inscription, merci de réessayer plus tard.",
          {
            variant: "error",
          }
        );
        return false;
      }
    } catch (error) {
      enqueueSnackbar(
        "Erreur lors de l'inscription, merci de réessayer plus tard.",
        {
          variant: "error",
        }
      );
      return false;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const status = await resetPasswordCall({ email }).unwrap();
      if (status.message) {
        enqueueSnackbar("Email envoyé", { variant: "success" });
        return true;
      }
    } catch (error) {
      enqueueSnackbar("Erreur lors de la réinitialisation du mot de passe", {
        variant: "error",
      });
      return false;
    }
  };

  return useMemo(
    () => ({
      user,
      loading,
      login,
      isLoadingLogin,
      register,
      isLoadingRegister,
      resetPassword,
      isLoadingResetPassword,
    }),
    [
      user,
      loading,
      login,
      isLoadingLogin,
      register,
      isLoadingRegister,
      resetPassword,
      isLoadingResetPassword,
    ]
  );
};
