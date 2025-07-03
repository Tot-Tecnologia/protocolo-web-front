import { RemoteAddDocumentosToProtocolo } from "@/data/usecases/addDocumentosToProtocolo/remoteAddDocumentosToProtocolo";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeAddDocumentosToProtocolo() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos/documentos";
  return new RemoteAddDocumentosToProtocolo(
    fullUrl,
    makeAuthorizeHttpClientDecorator(),
  );
}
