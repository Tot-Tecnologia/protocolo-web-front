import { RemoteLoadTiposDocumentoList } from "@/data/usecases/loadTiposDocumentoList/remoteLoadTiposDocumentoList";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeLoadTiposDocumentoList() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/tipos-documento";
  return new RemoteLoadTiposDocumentoList(fullUrl, makeAxiosHttpClient());
}
