import {
  LoadDocumentoList,
  ILoadDocumentoListArgs,
  ILoadDocumentoListResponse,
} from "@/domain/usecases";
import { HttpClient } from "@/data/protocols/http/httpClient";

export class RemoteLoadDocumentoList implements LoadDocumentoList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async loadWithFilter(
    args: ILoadDocumentoListArgs,
  ): Promise<ILoadDocumentoListResponse[]> {
    const response = await this.httpClient.request<
      ILoadDocumentoListResponse[]
    >({
      url: this.url,
      method: "get",
      body: args,
    });

    return response.body;
  }
}
