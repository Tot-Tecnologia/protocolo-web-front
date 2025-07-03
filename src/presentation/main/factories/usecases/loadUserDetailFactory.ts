import { RemoteLoadUserDetail } from "@/data/usecases/loadUserDetail/remoteLoadUserDetail";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

export function makeLoadUserDetail() {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + "/portal-cidadao/auth/detalhar";
  return new RemoteLoadUserDetail(fullUrl, makeAuthorizeHttpClientDecorator());
}
