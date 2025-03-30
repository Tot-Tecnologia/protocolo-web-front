import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";
import { ValidationError } from "@/domain/errors/validationError";
import { AddAccount, AddAccountArgs } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccountArgs, void>,
  ) {}

  async signUp(args: AddAccountArgs): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: args,
      headers: undefined,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unprocessableEntity:
        throw new ValidationError();
      default:
        throw new UnexpectedError();
    }
  }
}
