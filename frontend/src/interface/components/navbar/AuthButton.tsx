import { logout } from "@/application/redux/slices/auth.slice";
import { useAppDispatch } from "@/application/redux/store";
import { User } from "@/domain/entities/user.type";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type AuthButtonProps = {
  user: User | null;
  onClick: () => void;
};

export default function AuthButton(props: AuthButtonProps) {
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
      startIcon={props.user ? <LogoutIcon /> : <LoginIcon />}
      onClick={props.user ? handleLogout : handleLogin}
    >
      <Typography
        component="span"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {props.user ? t("nav.logout") : t("nav.login")}
      </Typography>
    </Button>
  );
}
