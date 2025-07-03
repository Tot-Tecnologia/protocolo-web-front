import {
  LoadProtocoloList,
  LoadProtocoloListArgs,
  LoadProtocoloListResponse,
} from "@/domain/usecases";
import { UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http";

export class RemoteLoadProtocoloList implements LoadProtocoloList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async loadWithFilter(
    args: LoadProtocoloListArgs,
  ): Promise<LoadProtocoloListResponse> {
    const queryString = new URLSearchParams(args as never).toString();
    const fullUrl = `${this.url}?${queryString}`;

    const response = await this.httpClient.request<LoadProtocoloListResponse>({
      url: fullUrl,
      method: "get",
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
