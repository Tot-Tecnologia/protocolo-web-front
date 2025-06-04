import { makeAddDocumentosToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { makeUiNotification } from "@/presentation/main/factories/usecases/uiNotificationFactory";
import { DetailsProtocoloServidor } from "@/presentation/views/DetailsProtocoloServidor";

export function makeDetailsProtocoloServidor() {
	return (
		<DetailsProtocoloServidor
			uiNotification={makeUiNotification()}
			loadProtocoloDetails={makeLoadProtocoloDetails()}
			addDocumentosToProtocolo={makeAddDocumentosToProtocolo({ tipo: 'guias' })}
		/>
	)
}