import axios from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/httpClient";

export class AxiosHttpClient implements HttpClient {
  async request<TResponseBody = any, TRequestBody = any>(
    data: HttpRequest<TRequestBody>,
  ): Promise<HttpResponse<TResponseBody>> {
    try {
      const axiosResponse = await axios.request<TResponseBody>({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
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
      console.error(error);
    }

    return {
      body: null as never,
      statusCode: HttpStatusCode.serverError,
    };
  }
}
