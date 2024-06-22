// hooks/useAlert.ts
import { addAlert, removeAlert } from "@/application/redux/slices/alerts.slice";
import {
  useAddAlertMutation,
  useRemoveAlertMutation,
} from "@/infrastructure/api/alert.api";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

const useAlert = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addAlertMutation] = useAddAlertMutation();
  const [removeAlertMutation] = useRemoveAlertMutation();

  const handleAddAlert = async (userId: string, productId: string) => {
    try {
      await addAlertMutation({ userId, productId }).unwrap();
      dispatch(addAlert(productId));
      enqueueSnackbar("Produit ajouté aux alertes", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'ajout aux alertes", {
        variant: "error",
      });
    }
  };

  const handleRemoveAlert = async (userId: string, productId: string) => {
    try {
      await removeAlertMutation({ userId, productId }).unwrap();
      dispatch(removeAlert(productId));
      enqueueSnackbar("Produit retiré des alertes", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors du retrait des alertes", {
        variant: "error",
      });
    }
  };

  return {
    handleAddAlert,
    handleRemoveAlert,
  };
};

export default useAlert;
