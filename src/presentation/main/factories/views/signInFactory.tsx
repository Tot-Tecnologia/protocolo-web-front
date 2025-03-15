import { makeAuthentication } from "@/presentation/main/factories/usecases/authentication";
import { SignIn } from "@/presentation/views/SignIn";

export function makeSignIn() {
  return <SignIn authentication={makeAuthentication()} />;
}
