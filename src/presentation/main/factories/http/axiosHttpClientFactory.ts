import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";

export function makeAxiosHttpClient<
  TRequestBody = unknown,
  TResponseBody = unknown,
>() {
  return new AxiosHttpClient<TRequestBody, TResponseBody>();
}
