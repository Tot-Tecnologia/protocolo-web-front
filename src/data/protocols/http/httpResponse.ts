export enum HttpStatusCode {
  ok = 200,
}

export type HttpResponse<TBody = unknown> = {
  statusCode: HttpStatusCode;
  body: TBody;
};
