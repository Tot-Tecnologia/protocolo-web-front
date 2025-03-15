import { UiNotification } from "@/domain/usecases";
import { toast } from "react-toastify";

export class NotificationService implements UiNotification {
  info(message: React.ReactNode): void {
    toast.info(message);
  }

  error(message: React.ReactNode): void {
    toast.error(message);
  }
}

export const notificationService = new NotificationService();
