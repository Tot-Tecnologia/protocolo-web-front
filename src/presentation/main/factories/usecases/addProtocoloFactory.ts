import { RemoteAddProtocolo } from "@/data/usecases/addProtocolo/remoteAddProtocolo";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeAddProtocolo() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos";
  return new RemoteAddProtocolo(fullUrl, makeAuthorizeHttpClientDecorator());
}
