import {
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpResponse";
import { InvalidCredentialsError } from "@/domain/errors/invalidCredentialsError";
import { UnexpectedError } from "@/domain/errors/unexpectedError";
import { AccountModel } from "@/domain/models";
import { AuthenticationArgs } from "@/domain/usecases";
import { FirebaseError } from "firebase/app";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuthentication {
  constructor(private readonly auth: Auth) {}

  async signIn({
    email,
    password,
  }: AuthenticationArgs): Promise<HttpResponse<AccountModel>> {
    try {
      const firebaseResponse = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      const accessToken = await firebaseResponse.user.getIdToken();

      return {
        body: { accessToken },
        statusCode: HttpStatusCode.ok,
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

      throw new UnexpectedError();
    }
  }
}
