import { GetStorage } from "@/data/protocols/cache";
import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient,
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const accessToken = this.getStorage.get("accessToken") as string;

    if (accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${accessToken}`,
        }),
      });
    }

    return this.httpClient.request(data);
  }
}
