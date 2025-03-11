import {
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpResponse";
import { AccountModel } from "@/domain/models";
import { AuthenticationArgs } from "@/domain/usecases";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";

export class FirebaseAuthentication {
  constructor(private readonly auth: Auth) {}

  async signIn({
    email,
    password,
  }: AuthenticationArgs): Promise<HttpResponse<AccountModel>> {
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
  }
}
