import { FirebaseAuthentication } from "@/data/usecases/authentication/firebaseAuthentication";
import { firebaseAuth } from "@/infra/frameworks/firebase";

export function makeAuthentication() {
  return new FirebaseAuthentication(firebaseAuth);
}
