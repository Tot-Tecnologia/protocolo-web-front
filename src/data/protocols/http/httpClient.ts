export type HttpMethod = "post" | "get" | "put" | "delete";

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unprocessableEntity = 422,
  serverError = 500,
}

export type HttpRequest<TBody = any> = {
  url: string;
  method: HttpMethod;
  body?: TBody;
  headers?: unknown;
};

export type HttpResponse<TBody = any> = {
  statusCode: HttpStatusCode;
  body: TBody;
};

export interface HttpClient {
  request: <TResponseBody = any, TRequestBody = any>(
    data: HttpRequest<TRequestBody>,
  ) => Promise<HttpResponse<TResponseBody>>;
}
