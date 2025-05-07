import { makeAddProtocolo } from "@/presentation/main/factories/usecases/addProtocoloFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { CreateProtocolo } from "@/presentation/views/CreateProtocolo";

export function makeCreateProtocolo() {
  return (
    <CreateProtocolo
      addProtocolo={makeAddProtocolo()}
      uiNotification={makeUiNotification()}
    />
  );
}
