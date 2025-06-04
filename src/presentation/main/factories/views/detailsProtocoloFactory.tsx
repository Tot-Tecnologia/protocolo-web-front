import { UserType } from "@/domain/models";
import { useUserType } from "@/presentation/hooks/useUserType";
import { makeAddDocumentosToProtocolo, makeAddGuiaToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { DetailsProtocolo } from "@/presentation/views/DetailsProtocolo";

export function makeDetailsProtocolo() {

  const [userType] = useUserType();

  const makeAddDocumentos = userType === UserType.CIDADAO ?
    makeAddDocumentosToProtocolo : makeAddGuiaToProtocolo;

  return (
    <DetailsProtocolo
      loadProtocoloDetails={makeLoadProtocoloDetails()}
      addDocumentosToProtocolo={makeAddDocumentos()}
      uiNotification={makeUiNotification()}
    />
  );
}
