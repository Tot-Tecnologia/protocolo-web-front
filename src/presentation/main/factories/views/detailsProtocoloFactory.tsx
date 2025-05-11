import { makeLoadProtocoloDetails } from "@/presentation/main/factories/usecases/loadProtocoloDetailsFactory";
import { DetailsProtocolo } from "@/presentation/views/DetailsProtocolo";

export function makeDetailsProtocolo() {
  return <DetailsProtocolo loadProtocoloDetails={makeLoadProtocoloDetails()} />;
}
