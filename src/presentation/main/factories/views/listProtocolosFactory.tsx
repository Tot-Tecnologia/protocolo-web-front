import { makeLoadProtocoloList } from "@/presentation/main/factories/usecases/loadProtocoloFactory";
import { ListProtocolos } from "@/presentation/views/ListProtocolos";

export function makeListProtocolos() {
  return <ListProtocolos loadProtocoloList={makeLoadProtocoloList()} />;
}
