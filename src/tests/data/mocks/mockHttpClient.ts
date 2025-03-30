import {
  HttpClient,
  HttpMethod,
  HttpResponse,
  HttpRequest,
  HttpStatusCode,
} from "@/data/protocols/http/httpClient";

export class HttpClientSpy<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpClient<TRequestBody, TResponseBody>
{
  url?: string;
  method?: HttpMethod;
  body?: TRequestBody;
  response: HttpResponse<TResponseBody> = {
    body: null as never,
    statusCode: HttpStatusCode.ok,
  };

  request(data: HttpRequest<TRequestBody>) {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;

    return Promise.resolve(this.response);
  }
}
