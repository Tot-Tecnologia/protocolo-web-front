import type {
  ChangeProtocolStatus,
  ChangeProtocolStatusArgs,
  ChangeProtocolStatusResponse,
} from "@/domain/usecases/changeProtocolStatus";

import { HttpClient, HttpStatusCode } from "../../protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors";

export class RemoteChangeProtocolStatus implements ChangeProtocolStatus {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async change(
    args: ChangeProtocolStatusArgs,
    token: string,
  ): Promise<ChangeProtocolStatusResponse> {
    const response = await this.httpClient.request({
      method: "patch",
      body: {
        status: args.status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${this.url}${args.id}`,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok: {
        return response.body;
      }
      default:
        throw new UnexpectedError();
    }
  }
}
