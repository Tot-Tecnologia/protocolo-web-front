import { makePasswordRecovery } from "@/presentation/main/factories/usecases/passwordRecoveryFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { RecoverPassword } from "@/presentation/views/RecoverPassword";

export function makeRecoverPassword() {
  return (
    <RecoverPassword
      passwordRecovery={makePasswordRecovery()}
      uiNotification={makeUiNotification()}
    />
  );
}
