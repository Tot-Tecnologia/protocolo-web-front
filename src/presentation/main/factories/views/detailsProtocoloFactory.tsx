import { UserType } from "@/domain/models";
import { useUserType } from "@/presentation/hooks/useUserType";
import { makeAddDocumentosToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { DetailsProtocolo } from "@/presentation/views/DetailsProtocolo";

export function makeDetailsProtocolo() {

  const [userType] = useUserType();

  const tipo = userType === UserType.CIDADAO ? 'documentos' : 'guias';

  return (
    <DetailsProtocolo
      loadProtocoloDetails={makeLoadProtocoloDetails()}
      addDocumentosToProtocolo={makeAddDocumentosToProtocolo({
        tipo
      })}
      uiNotification={makeUiNotification()}
    />
  );
}
