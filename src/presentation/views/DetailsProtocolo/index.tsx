import { LoadProtocoloDetails } from "@/domain/usecases";
import { PageContainer } from "@/presentation/components/PageContainer";
import {
  DETAILS_PROTOCOLO_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { InformacoesCard } from "./common/components/InformacoesCard";
import { useProtocoloDetailsQuery } from "@/presentation/views/DetailsProtocolo/common/hooks/useProtocoloDetailsQuery";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useParams } from "@tanstack/react-router";

type DetailsProtocoloProps = {
  loadProtocoloDetails: LoadProtocoloDetails;
};

export function DetailsProtocolo({
  loadProtocoloDetails,
}: DetailsProtocoloProps) {
  const [token] = useAccessToken();

  const { numeroProtocolo } = useParams({ from: DETAILS_PROTOCOLO_ROUTE_URL });

  const idProtocolo = Number(numeroProtocolo);

  const { data, isLoading, isError } = useProtocoloDetailsQuery({
    idProtocolo: idProtocolo,
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
            {/*
            <HistoricoAtualizacoesTable />
            <GuiasPagamentoTable />
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
