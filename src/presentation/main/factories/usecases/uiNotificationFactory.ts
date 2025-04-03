import { ToastifyNotification } from "@/presentation/services/toastifyNotification";

export function makeUiNotification() {
  return new ToastifyNotification();
}
