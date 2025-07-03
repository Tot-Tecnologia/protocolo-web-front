import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { UnauthorizedError } from "@/domain/errors";
import { LoadUserDetail } from "@/domain/usecases/loadUserDetail";
import { UserDetailModel } from "@/domain/models";

export class RemoteLoadUserDetail implements LoadUserDetail {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async load(): Promise<UserDetailModel> {
    const response = await this.httpClient.request<UserDetailModel>({
      url: this.url,
      method: "get",
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok: {
        return response.body;
      }
      default:
        throw new UnauthorizedError();
    }
  }
}
