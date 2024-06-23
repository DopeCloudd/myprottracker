import useAlert from "@/application/hooks/useAlert";
import { useAuth } from "@/application/hooks/useAuth";
import useFetchUserAlerts from "@/application/hooks/useFetchUserAlerts";
import { selectAlerts } from "@/application/redux/slices/alerts.slice";
import { useTypedSelector } from "@/application/redux/store";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";

export const ButtonAlert: React.FC<{ productId: number }> = ({ productId }) => {
  const { user } = useAuth();
  useFetchUserAlerts(user?.id || null);

  const { handleAddAlert, handleRemoveAlert } = useAlert();

  const alerts = useTypedSelector((state) => selectAlerts(state)) || [];

  const isAlert = alerts.some((product) => product.id === productId);

  if (!user) return null;

  return (
    <NotificationsIcon
      onClick={
        isAlert
          ? () => handleRemoveAlert(user?.id, productId)
          : () => handleAddAlert(user?.id, productId)
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
        transition: "fill 0.3s",
        "&:hover": {
          fill: "gold",
        },
      }}
    />
  );
};
