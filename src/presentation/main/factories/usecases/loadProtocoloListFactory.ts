import { RemoteLoadProtocoloList } from "@/data/usecases/loadProtocoloList/remoteLoadProtocoloList";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeLoadProtocoloList() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/protocolos";
  return new RemoteLoadProtocoloList(
    fullUrl,
    makeAuthorizeHttpClientDecorator(),
  );
}
