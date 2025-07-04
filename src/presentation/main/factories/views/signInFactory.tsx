import { SignIn } from "@/presentation/views/SignIn";
import { makeAuthentication } from "@/presentation/main/factories/usecases/authentication";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";

export function makeSignIn() {
  return (
    <SignIn
      authentication={makeAuthentication()}
      uiNotification={makeUiNotification()}
    />
  );
}
