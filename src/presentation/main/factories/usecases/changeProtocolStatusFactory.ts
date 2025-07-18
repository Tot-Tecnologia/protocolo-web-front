import { RemoteChangeProtocolStatus } from "@/data/usecases/changeProtocolStatus/remoteChangeProtocolStatus";
import { makeAxiosHttpClient } from "../http/axiosHttpClientFactory";

export function makeChangeProtocolStatus() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos/";

  return new RemoteChangeProtocolStatus(fullUrl, makeAxiosHttpClient());
}
