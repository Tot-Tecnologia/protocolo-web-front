import { PageContainer } from "@/presentation/components/PageContainer";
import { ListProtocolosFilter } from "./common/components/ListProtocolosFilter";
import { ListProtocolosTable } from "./common/components/ListProtocolosTable";

export function ListProtocolos() {
  return (
    <PageContainer title="Consultar Solicitação">
      <div className="grid gap-y-10">
        <ListProtocolosFilter />
        <ListProtocolosTable />
      </div>
    </PageContainer>
  );
}
