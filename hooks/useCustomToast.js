import { useContext } from "react";
import { ToastContext } from "../constants/data";

export function useCustomToast() {
  const customToast = useContext(ToastContext);
  return customToast.openDialog;
}