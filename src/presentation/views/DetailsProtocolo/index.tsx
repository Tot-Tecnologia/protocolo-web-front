import { useParams } from "@tanstack/react-router";
import { LoadProtocoloDetails } from "@/domain/usecases";
import { PageContainer } from "@/presentation/components/PageContainer";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import {
  DETAILS_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { InformacoesCard } from "./common/components/InformacoesCard";
import { HistoricoAtualizacoesTable } from "./common/components/HistoricoAtualizacoesTable";
import { GuiasPagamentoTable } from "./common/components/GuiasPagamentoTable";
import { useProtocoloDetailsQuery } from "./common/hooks/useProtocoloDetailsQuery";

type DetailsProtocoloProps = {
  loadProtocoloDetails: LoadProtocoloDetails;
};

export function DetailsProtocolo({
  loadProtocoloDetails,
}: DetailsProtocoloProps) {
  const [token] = useAccessToken();

  const { numeroProtocolo } = useParams({ from: DETAILS_PROTOCOLO_ROUTE_URL });

  const { data, isLoading, isError } = useProtocoloDetailsQuery({
    numeroProtocolo: numeroProtocolo,
    loadProtocoloDetails: loadProtocoloDetails,
    token: token,
  });

  return (
    <PageContainer
      navigateBackwardTo={LIST_PROTOCOLOS_ROUTE_URL}
      title="Consultar solicitação"
    >
      <div className="space-y-10">
        {data != null && !isLoading && !isError && (
          <>
            <InformacoesCard protocolo={data} />
            <HistoricoAtualizacoesTable />
            <GuiasPagamentoTable />
            {/*
            <ComplementarCard />
            */}
          </>
        )}

        {isLoading && <p>Carregando...</p>}

        {isError && <p>Erro ao exibir informações.</p>}
      </div>
    </PageContainer>
  );
}
