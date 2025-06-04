import { makeAddDocumentosToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { DetailsProtocolo } from "@/presentation/views/DetailsProtocolo";

export function makeDetailsProtocolo() {

  return (
    <DetailsProtocolo
      loadProtocoloDetails={makeLoadProtocoloDetails()}
      addDocumentosToProtocolo={makeAddDocumentosToProtocolo({
        tipo: 'documentos'
      })}
      uiNotification={makeUiNotification()}
    />
  );
}
