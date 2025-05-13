import { makeLoadProtocoloList } from "@/presentation/main/factories/usecases/loadProtocoloListFactory";
import { makeLoadTiposDocumentoList } from "@/presentation/main/factories/usecases/loadTiposDocumentoListFactory";
import { ListProtocolos } from "@/presentation/views/ListProtocolos";

export function makeListProtocolos() {
  return (
    <ListProtocolos
      loadProtocoloList={makeLoadProtocoloList()}
      loadTiposDocumentoList={makeLoadTiposDocumentoList()}
    />
  );
}
