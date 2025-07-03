/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpClient,
  HttpMethod,
  HttpResponse,
  HttpRequest,
  HttpStatusCode,
} from "@/data/protocols/http";
import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => {
  const url = faker.internet.url();
  const methods: HttpMethod[] = ["delete", "get", "post", "put"];
  const method = faker.helpers.arrayElement(methods);
  const headers = {
    string: faker.string.alphanumeric(),
  };
  const requestBody = {
    number: faker.number.int(),
    string: faker.string.alphanumeric(),
    boolean: faker.datatype.boolean(),
  };

  return {
    url: url,
    method: method,
    body: requestBody,
    headers: headers,
  };
};

export class HttpClientSpy implements HttpClient {
  url?: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  response: HttpResponse = {
    body: null as never,
    statusCode: HttpStatusCode.ok,
  };

  request(data: HttpRequest) {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;

    return Promise.resolve(this.response);
  }
}
