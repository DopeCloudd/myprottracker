import { useAuth } from "@/application/hooks/useAuth";
import { logout } from "@/application/redux/slices/auth.slice";
import { useAppDispatch } from "@/application/redux/store";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const ButtonAuth: React.FC = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Store the last visited URL
    localStorage.setItem("lastVisited", location.pathname);
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
      sx={isXs ? { width: "100%" } : {}}
    >
      <Typography component="span">
        {user ? t("nav.logout") : t("nav.login")}
      </Typography>
    </Button>
  );
};
