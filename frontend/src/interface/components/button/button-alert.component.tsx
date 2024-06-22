import useAlert from "@/application/hooks/useAlert";
import { useAuth } from "@/application/hooks/useAuth";
import { selectAlerts } from "@/application/redux/slices/alerts.slice";
import { useTypedSelector } from "@/application/redux/store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";

export const ButtonAlert: React.FC<{ productId: number }> = ({ productId }) => {
  const { user } = useAuth();

  const { handleAddAlert, handleRemoveAlert } = useAlert();

  const alerts = useTypedSelector((state) => selectAlerts(state));

  const isAlert = alerts.includes(String(productId));

  if (!user) return null;

  return (
    <NotificationsIcon
      onClick={
        isAlert
          ? () => handleRemoveAlert(user?.id, String(productId))
          : () => handleAddAlert(user?.id, String(productId))
      }
      sx={{
        marginRight: "8px",
        padding: "10px",
        backgroundColor: "#171717",
        border: "1px solid",
        borderRadius: "6px",
        borderColor: "#00A656",
        cursor: "pointer",
        fontSize: "40px",
        fill: isAlert ? "#faaf00" : "white",
        "&:hover": {
          fill: "gold",
        },
      }}
    />
  );
};
