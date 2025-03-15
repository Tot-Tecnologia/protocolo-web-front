import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { firebaseAuth } from "@/infra/frameworks";

export function makeAuthentication() {
  return new FirebaseAuthentication(firebaseAuth);
}
