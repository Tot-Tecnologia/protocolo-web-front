import { makeAddDocumentosToProtocolo } from "@/presentation/main/factories/usecases/addDocumentosToProtocoloFactory";
import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { DetailsProtocoloServidor } from "@/presentation/views/DetailsProtocoloServidor";

export function makeDetailsProtocoloServidor() {
	return (
		<DetailsProtocoloServidor
			loadProtocoloDetails={makeLoadProtocoloDetails()}
			addDocumentosToProtocolo={makeAddDocumentosToProtocolo({ tipo: 'guias' })}
		/>
	)
}