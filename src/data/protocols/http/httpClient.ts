export type HttpMethod = "post" | "get" | "put" | "delete" | "patch";

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unprocessableEntity = 422,
  serverError = 500,
  notFound = 404,
}

export type HttpRequest<TBody = any> = {
  url: string;
  method: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
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
