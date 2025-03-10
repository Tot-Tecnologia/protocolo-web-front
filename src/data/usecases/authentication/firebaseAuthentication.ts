import { AuthenticationArgs } from "@/domain/usecases";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuthentication {
  constructor(private readonly auth: Auth) {}

  signIn({ email, password }: AuthenticationArgs) {
    void signInWithEmailAndPassword(this.auth, email, password);
  }
}
