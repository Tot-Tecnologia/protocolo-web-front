import { RemoteLoadTiposDocumentoList } from "@/data/usecases/loadTiposDocumentoList/remoteLoadTiposDocumentoList";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeLoadTiposDocumentoList() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/tipos-documento";
  return new RemoteLoadTiposDocumentoList(
    fullUrl,
    makeAuthorizeHttpClientDecorator(),
  );
}
