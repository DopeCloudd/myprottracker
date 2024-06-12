import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { User } from "../../../domain/entities/user.type";

type AuthButtonProps = {
  user: User | null;
  onClick: () => void;
};

export default function AuthButton(props: AuthButtonProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    console.log("Logout");
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
