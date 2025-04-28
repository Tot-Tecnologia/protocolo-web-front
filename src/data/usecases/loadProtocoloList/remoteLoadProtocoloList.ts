import {
  LoadProtocoloList,
  ILoadProtocoloListArgs,
  ILoadProtocoloListResponse,
} from "@/domain/usecases";
import { HttpClient } from "@/data/protocols/http/httpClient";

export class RemoteLoadProtocoloList implements LoadProtocoloList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async loadWithFilter(
    args: ILoadProtocoloListArgs,
  ): Promise<ILoadProtocoloListResponse[]> {
    const response = await this.httpClient.request<
      ILoadProtocoloListResponse[]
    >({
      url: this.url,
      method: "get",
      body: args,
    });

    return response.body;
  }
}
