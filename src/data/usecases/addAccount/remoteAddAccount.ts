import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { ValidationError } from "@/domain/errors/validationError";
import { AddAccount, AddAccountArgs } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccountArgs, void>,
  ) {}

  async signIn(args: AddAccountArgs): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: args,
      headers: undefined,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unprocessableEntity:
        throw new ValidationError();
      default:
        break;
    }
  }
}
