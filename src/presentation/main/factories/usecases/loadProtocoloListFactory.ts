import { RemoteLoadProtocoloList } from "@/data/usecases/loadProtocoloList/remoteLoadProtocoloList";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeLoadProtocoloList() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos";
  return new RemoteLoadProtocoloList(fullUrl, makeAxiosHttpClient());
}
