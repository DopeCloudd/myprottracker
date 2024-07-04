import { useAuth } from "@/application/hooks/useAuth";
import { logout } from "@/application/redux/slices/auth.slice";
import { useAppDispatch } from "@/application/redux/store";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ButtonAuth: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      variant="outlined"
      startIcon={user ? <LogoutIcon /> : <LoginIcon />}
      onClick={user ? handleLogout : handleLogin}
    >
      <Typography
        component="span"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {user ? t("nav.logout") : t("nav.login")}
      </Typography>
    </Button>
  );
};
