import {
  LoadProtocoloDetails,
  LoadProtocoloDetailsArgs,
  LoadProtocoloDetailsResponse,
} from "@/domain/usecases";
import { UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";

export class RemoteLoadProtocoloDetails implements LoadProtocoloDetails {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async load(
    args: LoadProtocoloDetailsArgs,
    token: string,
  ): Promise<LoadProtocoloDetailsResponse> {
    const fullUrl = `${this.url}/${args.id}`;

    const response =
      await this.httpClient.request<LoadProtocoloDetailsResponse>({
        url: fullUrl,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
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
