import { makeAddProtocolo } from "@/presentation/main/factories/usecases/addProtocoloFactory";
import { makeLoadTiposDocumentoList } from "@/presentation/main/factories/usecases/loadTiposDocumentoListFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { CreateProtocolo } from "@/presentation/views/CreateProtocolo";

export function makeCreateProtocolo() {
  return (
    <CreateProtocolo
      addProtocolo={makeAddProtocolo()}
      uiNotification={makeUiNotification()}
      loadTiposDocumentoList={makeLoadTiposDocumentoList()}
    />
  );
}
