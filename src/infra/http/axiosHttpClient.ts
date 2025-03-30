import axios from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpClient";

export class AxiosHttpClient<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpClient<TRequestBody, TResponseBody>
{
  async request(
    data: HttpRequest<TRequestBody>,
  ): Promise<HttpResponse<TResponseBody>> {
    try {
      const axiosResponse = await axios.request<TResponseBody>({
        url: data.url,
        method: data.method,
        data: data.body,
      });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error) {
      if (axios.isAxiosError<TResponseBody>(error)) {
        if (error.response) {
          return {
            body: error.response?.data,
            statusCode: error.response?.status,
          };
        }
      }
    }

    return {
      body: null as never,
      statusCode: HttpStatusCode.serverError,
    };
  }
}
