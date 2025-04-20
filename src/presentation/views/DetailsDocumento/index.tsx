import { PageContainer } from "@/presentation/components/PageContainer";
import { LIST_DOCUMENTOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { HistoricoAtualizacoesTable } from "./common/HistoricoAtualizacoesTable";
import { InformacoesCard } from "./common/InformacoesCard";
import { GuiasPagamentoTable } from "./common/GuiasPagamentoTable";

export function DetailsDocumento() {
  return (
    <PageContainer
      navigateBackwardTo={LIST_DOCUMENTOS_ROUTE_URL}
      title="Consultar solicitação"
    >
      <div className="space-y-10">
        <InformacoesCard />
        <HistoricoAtualizacoesTable />
        <GuiasPagamentoTable />
      </div>
    </PageContainer>
  );
}
