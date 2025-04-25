import { AxiosHttpClient } from "@/infra/http/axiosHttpClient";

export function makeAxiosHttpClient() {
  return new AxiosHttpClient();
}
