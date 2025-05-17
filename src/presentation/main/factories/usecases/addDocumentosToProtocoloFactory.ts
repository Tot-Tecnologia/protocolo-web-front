import { RemoteAddDocumentosToProtocolo } from "@/data/usecases/addDocumentosToProtocolo/remoteAddDocumentosToProtocolo";
import { makeAxiosHttpClient } from "@/presentation/main/factories/http/axiosHttpClientFactory";

export function makeAddDocumentosToProtocolo() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos/documentos";
  return new RemoteAddDocumentosToProtocolo(fullUrl, makeAxiosHttpClient());
}
