import { makeAddAccount } from "@/presentation/main/factories/usecases/addAccountFactory";
import { SignUp } from "@/presentation/views/SignUp";

export function makeSignUp() {
  return <SignUp addAccount={makeAddAccount()} />;
}
