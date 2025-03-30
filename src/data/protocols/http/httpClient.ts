export type HttpRequest<TBody = unknown> = {
  url: string;
  method: HttpMethod;
  body?: TBody;
  headers?: unknown;
};

export interface HttpClient<TRequestBody = unknown, TResponseBody = unknown> {
  request: (
    data: HttpRequest<TRequestBody>,
  ) => Promise<HttpResponse<TResponseBody>>;
}

export type HttpMethod = "post" | "get" | "put" | "delete";

export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
}

export type HttpResponse<TBody = unknown> = {
  statusCode: HttpStatusCode;
  body: TBody;
};
