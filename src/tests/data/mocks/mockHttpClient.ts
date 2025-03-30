import {
  HttpClient,
  HttpMethod,
  HttpResponse,
  HttpRequest,
  HttpStatusCode,
} from "@/data/protocols/http/httpClient";
import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => {
  const url = faker.internet.url();
  const methods: HttpMethod[] = ["delete", "get", "post", "put"];
  const method = faker.helpers.arrayElement(methods);
  const requestBody = {
    number: faker.number.int(),
    string: faker.string.alphanumeric(),
    boolean: faker.datatype.boolean(),
  };

  return {
    url: url,
    method: method,
    body: requestBody,
    headers: undefined,
  };
};

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
