import { PageContainer } from "@/presentation/components/PageContainer";
import { ListDocumentosFilter } from "./common/components/ListDocumentosFilter";
import { ListDocumentosTable } from "./common/components/ListDocumentosTable";

export function ListDocumentos() {
  return (
    <PageContainer title="Consultar Solicitação">
      <div className="grid gap-y-10">
        <ListDocumentosFilter />
        <ListDocumentosTable />
      </div>
    </PageContainer>
  );
}
