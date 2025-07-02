import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { PasswordRecovery, PasswordRecoveryArgs } from "@/domain/usecases";
import { FirebaseError } from "firebase/app";
import { Auth, sendPasswordResetEmail } from "firebase/auth";

export class FirebasePasswordRecovery implements PasswordRecovery {
  constructor(private readonly auth: Auth) {}

  async recover({ email }: PasswordRecoveryArgs): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (["auth/invalid-email", "auth/missing-email"].includes(error.code)) {
          throw new InvalidCredentialsError();
        }
        console.error(error);
      }

      throw new UnexpectedError();
    }
  }
}
