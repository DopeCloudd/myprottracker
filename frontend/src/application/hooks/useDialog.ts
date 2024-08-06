import {
  selectOpenDialog,
  setClose,
  setOpen,
} from "@/application/redux/slices/dialog.slice";
import { useAppDispatch } from "@/application/redux/store";
import { useSelector } from "react-redux";

const useDialog = () => {
  const dispatch = useAppDispatch();
  const open = useSelector(selectOpenDialog);

  const handleClickOpen = () => {
    dispatch(setOpen());
  };

  const handleClose = () => {
    dispatch(setClose());
  };

  return {
    handleClickOpen,
    handleClose,
    open,
  };
};

export default useDialog;
