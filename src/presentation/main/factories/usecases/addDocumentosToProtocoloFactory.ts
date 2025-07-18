import { RemoteAddDocumentosToProtocolo } from "@/data/usecases/addDocumentosToProtocolo/remoteAddDocumentosToProtocolo";
import { makeAuthorizeHttpClientDecorator } from "@/presentation/main/factories/decorators/authorizeHttpClientDecoratorFacoty";

type MakeAddDocumentosToProtocoloProps = {
  tipo: "documentos" | "guias";
};

export function makeAddDocumentosToProtocolo({
  tipo,
}: MakeAddDocumentosToProtocoloProps) {
  const baseUrl = import.meta.env.VITE_PROTOCOLO_WEB_API_URL;
  const fullUrl = baseUrl + `/portal-cidadao/protocolos/${tipo}`;
  return new RemoteAddDocumentosToProtocolo(
    fullUrl,
    makeAuthorizeHttpClientDecorator(),
  );
}
