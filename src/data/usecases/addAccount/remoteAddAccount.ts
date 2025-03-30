import { HttpClient } from "@/data/protocols/http/httpClient";
import { AddAccount, AddAccountArgs } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddAccountArgs, void>,
  ) {}

  async signIn(args: AddAccountArgs): Promise<void> {
    const promise = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: args,
      headers: undefined,
    });

    return promise.body;
  }
}
