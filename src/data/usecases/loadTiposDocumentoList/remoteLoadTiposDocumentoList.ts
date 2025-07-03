import { LoadTiposDocumentoList } from "@/domain/usecases";
import { UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "@/data/protocols/http/httpClient";
import { TipoDocumentoModel } from "@/domain/models";

export class RemoteLoadTiposDocumentoList implements LoadTiposDocumentoList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async loadAll(): Promise<TipoDocumentoModel[]> {
    const response = await this.httpClient.request<TipoDocumentoModel[]>({
      url: this.url,
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
