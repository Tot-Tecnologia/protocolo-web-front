import axios from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/data/protocols/http/httpClient";

export class AxiosHttpClient<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpClient<TRequestBody, TResponseBody>
{
  async request(
    data: HttpRequest<TRequestBody>,
  ): Promise<HttpResponse<TResponseBody>> {
    const axiosResponse = await axios.request<TResponseBody>({
      url: data.url,
      method: data.method,
    });

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
