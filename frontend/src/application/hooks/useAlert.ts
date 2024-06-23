// hooks/useAlert.ts
import { addAlert, removeAlert } from "@/application/redux/slices/alerts.slice";
import { useAppDispatch } from "@/application/redux/store";
import {
  useAddAlertMutation,
  useRemoveAlertMutation,
} from "@/infrastructure/api/alert.api";
import { useSnackbar } from "notistack";

const useAlert = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addAlertMutation] = useAddAlertMutation();
  const [removeAlertMutation] = useRemoveAlertMutation();

  const handleAddAlert = async (userId: string, productId: number) => {
    try {
      const product = await addAlertMutation({ userId, productId }).unwrap();
      dispatch(addAlert(product));
      enqueueSnackbar("Produit ajouté aux alertes", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'ajout aux alertes", {
        variant: "error",
      });
    }
  };

  const handleRemoveAlert = async (userId: string, productId: number) => {
    try {
      const product = await removeAlertMutation({ userId, productId }).unwrap();
      dispatch(removeAlert(product));
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
