import { RemoteLoadUserDetail } from "@/data/usecases/loadUserDetail/remoteLoadUserDetail";
import { makeAxiosHttpClient } from "../http/axiosHttpClientFactory";

export function makeLoadUserDetail() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/auth/detalhar";
  return new RemoteLoadUserDetail(fullUrl, makeAxiosHttpClient());
}
