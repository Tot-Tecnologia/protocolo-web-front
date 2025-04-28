import { PageContainer } from "@/presentation/components/PageContainer";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { HistoricoAtualizacoesTable } from "./common/HistoricoAtualizacoesTable";
import { InformacoesCard } from "./common/InformacoesCard";
import { GuiasPagamentoTable } from "./common/GuiasPagamentoTable";
import { ComplementarCard } from "./common/ComplementarCard";

export function DetailsProtocolo() {
  return (
    <PageContainer
      navigateBackwardTo={LIST_PROTOCOLOS_ROUTE_URL}
      title="Consultar solicitação"
    >
      <div className="space-y-10">
        <InformacoesCard />
        <HistoricoAtualizacoesTable />
        <GuiasPagamentoTable />
        <ComplementarCard />
      </div>
    </PageContainer>
  );
}
