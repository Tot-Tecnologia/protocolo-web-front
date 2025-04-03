import { UiNotification } from "@/domain/usecases";
import { toast } from "react-toastify";

export class ToastifyNotification implements UiNotification {
  info(message: React.ReactNode): void {
    toast.info(message);
  }

  success(message: React.ReactNode): void {
    toast.success(message);
  }

  error(message: React.ReactNode): void {
    toast.error(message);
  }
}
