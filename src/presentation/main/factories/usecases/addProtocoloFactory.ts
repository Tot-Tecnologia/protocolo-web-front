import { RemoteAddProtocolo } from "@/data/usecases/addProtocolo/remoteAddProtocolo";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeAddProtocolo() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/cidadao/protocolos";
  return new RemoteAddProtocolo(fullUrl, makeAxiosHttpClient());
}
