import {
  makeAddAccount,
  makeAddServidorAccount,
} from "@/presentation/main/factories/usecases/addAccountFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { SignUp } from "@/presentation/views/SignUp";

export function makeSignUp() {
  return (
    <SignUp
      addAccount={makeAddAccount()}
      uiNotification={makeUiNotification()}
    />
  );
}

export function makeServidorSignUp() {
  return (
    <SignUp
      addAccount={makeAddServidorAccount()}
      uiNotification={makeUiNotification()}
    />
  );
}
