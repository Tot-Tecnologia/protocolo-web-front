import { makeAuthentication } from "@/presentation/main/factories/usecases/authentication";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { SignIn } from "@/presentation/views/SignIn";

export function makeSignIn() {
  return (
    <SignIn
      authentication={makeAuthentication()}
      uiNotification={makeUiNotification()}
    />
  );
}
