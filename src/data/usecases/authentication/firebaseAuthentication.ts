import {
  InvalidCredentialsError,
  UnauthorizedError,
  UnexpectedError,
} from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { Authentication, AuthenticationArgs } from "@/domain/usecases";
import { FirebaseError } from "firebase/app";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuthentication implements Authentication {
  constructor(private readonly auth: Auth) {}

  async signIn({ email, password }: AuthenticationArgs): Promise<AccountModel> {
    try {
      const firebaseResponse = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (!firebaseResponse.user.emailVerified) {
        throw new UnauthorizedError(
          "E-mail não verificado! Acesse o e-mail cadastrado para confirmação.",
        );
      }

      const accessToken = await firebaseResponse.user.getIdToken();

      localStorage.setItem("@ProtocoloWeb__Key=authToken", JSON.stringify(accessToken));

      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          [
            "auth/invalid-credential",
            "auth/invalid-email",
            "auth/missing-email",
            "auth/missing-password",
          ].includes(error.code)
        ) {
          throw new InvalidCredentialsError();
        }
        console.error(error);
      }

      if (error instanceof UnauthorizedError) {
        throw error;
      }

      throw new UnexpectedError();
    }
  }
}
