// hooks/useFetchUserData.ts
import { setAlerts } from "@/application/redux/slices/alerts.slice";
import { useGetAlertsQuery } from "@/infrastructure/api/alert.api";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";

const useFetchUserAlerts = (userId: string | null) => {
  const dispatch = useAppDispatch();

  const skip = !userId;
  const {
    data: alertData,
    error: alertError,
    isLoading: alertLoading,
  } = useGetAlertsQuery(userId!, { skip });

  useEffect(() => {
    if (skip) return;

    if (alertData) {
      dispatch(setAlerts(alertData));
    }
  }, [skip, alertData, dispatch]);

  return {
    alertLoading,
    alertError,
  };
};

export default useFetchUserAlerts;
