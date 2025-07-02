import { FirebasePasswordRecovery } from "@/data/usecases/passwordRecovery/firebasePasswordRecovery";
import { firebaseAuth } from "@/infra/frameworks/firebase";

export function makePasswordRecovery() {
  return new FirebasePasswordRecovery(firebaseAuth);
}
