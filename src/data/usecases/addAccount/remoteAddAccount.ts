import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { ProtocoloWebErrorResponse } from "@/domain/models/protocoloWebModel";
import { AddAccount, AddAccountArgs } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AddAccountArgs,
      void | ProtocoloWebErrorResponse
    >,
  ) {}

  async signUp(args: AddAccountArgs): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: args,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as void;
      case HttpStatusCode.unprocessableEntity: {
        const errorResponse = httpResponse.body as ProtocoloWebErrorResponse;
        const errors = (errorResponse.message as string[]) ?? [];
        throw new ValidationError({ errors });
      }
      default: {
        const errorResponse = httpResponse.body as ProtocoloWebErrorResponse;
        const errors = errorResponse.message;
        if (errors != null) {
          throw new ValidationError({
            errors: Array.isArray(errors) ? errors : [errors],
          });
        }
        throw new UnexpectedError();
      }
    }
  }
}
