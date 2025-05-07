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
      const token = (() => {
        try {
          const item = localStorage.getItem("@ProtocoloWeb__Key=authToken");
          return item ? JSON.parse(item) : null;
        } catch {
          return null;
        }
      })();

      const axiosResponse = await axios.request<TResponseBody>({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...data.headers ?? {},
        },
      });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error) {
      console.error(error);
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
