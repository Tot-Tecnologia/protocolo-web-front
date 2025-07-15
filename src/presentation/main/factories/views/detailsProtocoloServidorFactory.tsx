import { makeAddDocumentosToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeChangeProtocolStatus } from "@/presentation/main/factories/usecases/changeProtocolStatusFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { DetailsProtocoloServidor } from "@/presentation/views/DetailsProtocoloServidor";

export function makeDetailsProtocoloServidor() {
  return (
    <DetailsProtocoloServidor
      changeProtocolStatus={makeChangeProtocolStatus()}
      uiNotification={makeUiNotification()}
      loadProtocoloDetails={makeLoadProtocoloDetails()}
      addDocumentosToProtocolo={makeAddDocumentosToProtocolo({ tipo: "guias" })}
    />
  );
}
