import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { User } from "../../../domain/entities/user.type";

type AuthButtonProps = {
  user: User | null;
  onClick: () => void;
};

export default function AuthButton(props: AuthButtonProps) {
  const { t } = useTranslation();

  return (
    <Button variant="outlined">
      {props.user ? (
        <LogoutIcon fontSize="small" sx={{ mr: { xs: 0, md: 1 } }} />
      ) : (
        <LoginIcon fontSize="small" sx={{ mr: { xs: 0, md: 1 } }} />
      )}
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
