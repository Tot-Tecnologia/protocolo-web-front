import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebErrorResponse } from "@/domain/models";
import { AddAccount, AddAccountArgs } from "@/domain/usecases";
import {
  Auth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly auth: Auth,
  ) {}

  async signUp(args: AddAccountArgs): Promise<void> {
    const httpResponse =
      await this.httpClient.request<ProtocoloWebErrorResponse | void>({
        url: this.url,
        method: "post",
        body: args,
      });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        const userCredentials = await signInWithEmailAndPassword(
          this.auth,
          args.email,
          args.senha,
        );
        await sendEmailVerification(userCredentials.user);
        return httpResponse.body as void;
      }

      case HttpStatusCode.badRequest: {
        const errorResponse = httpResponse.body as ProtocoloWebErrorResponse;
        const errors = errorResponse?.errors;
        if (errors != null) {
          throw new ValidationError({ messages: errors });
        }
        throw new UnexpectedError();
      }

      default: {
        throw new UnexpectedError();
      }
    }
  }
}
