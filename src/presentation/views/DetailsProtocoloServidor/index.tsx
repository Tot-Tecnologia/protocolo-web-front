import { useParams } from "@tanstack/react-router";
import {
  AddDocumentosToProtocolo,
  LoadProtocoloDetails,
  UiNotification,
} from "@/domain/usecases";
import { ChangeProtocolStatus } from "@/domain/usecases/changeProtocolStatus";
import { PageContainer } from "@/presentation/components/PageContainer";
import {
  DETAILS_PROTOCOLO_SERVIDOR_ROUTE_URL,
  LIST_PROTOCOLOS_ROUTE_URL,
} from "@/presentation/constants/routesUrl";
import { ArquivosTable } from "@/presentation/views/DetailsProtocolo/common/components/ArquivosTable";
import { ComplementarCard } from "@/presentation/views/DetailsProtocolo/common/components/ComplementarCard";
import { GuiasPagamentoTable } from "@/presentation/views/DetailsProtocolo/common/components/GuiasPagamentoTable";
import { HistoricoAtualizacoesTable } from "@/presentation/views/DetailsProtocolo/common/components/HistoricoAtualizacoesTable";
import { InformacoesCard } from "@/presentation/views/DetailsProtocolo/common/components/InformacoesCard";
import { useProtocoloDetailsQuery } from "@/presentation/views/DetailsProtocolo/common/hooks/useProtocoloDetailsQuery";
import { AnaliseCidadaoCard } from "@/presentation/views/DetailsProtocoloServidor/common/components/AnaliseCidadaoCard";
import { AprovarRejeitarCard } from "@/presentation/views/DetailsProtocoloServidor/common/components/AprovarRejeitarCard";

type DetailsProtocoloServidorProps = {
  changeProtocolStatus: ChangeProtocolStatus;
  loadProtocoloDetails: LoadProtocoloDetails;
  addDocumentosToProtocolo: AddDocumentosToProtocolo;
  uiNotification: UiNotification;
};

export function DetailsProtocoloServidor({
  loadProtocoloDetails,
  uiNotification,
  addDocumentosToProtocolo,
  changeProtocolStatus,
}: DetailsProtocoloServidorProps) {
  const { numeroProtocolo } = useParams({
    from: DETAILS_PROTOCOLO_SERVIDOR_ROUTE_URL,
  });

  const { data, isLoading, isError } = useProtocoloDetailsQuery({
    numeroProtocolo: numeroProtocolo,
    loadProtocoloDetails: loadProtocoloDetails,
  });

  return (
    <PageContainer
      navigateBackwardTo={LIST_PROTOCOLOS_ROUTE_URL}
      title="Solicitação"
    >
      <div className="space-y-10">
        {data != null && !isLoading && !isError && (
          <>
            <AprovarRejeitarCard
              changeProtocolStatus={changeProtocolStatus}
              protocolo={data}
              uiNotification={uiNotification}
            />

            <InformacoesCard protocolo={data} />
            <HistoricoAtualizacoesTable />
            <GuiasPagamentoTable protocolo={data} />
            <ArquivosTable protocolo={data} />
            <AnaliseCidadaoCard />
            <ComplementarCard
              label="Enviar guia de pagamento"
              protocolo={data}
              uiNotification={uiNotification}
              addDocumentosToProtocolo={addDocumentosToProtocolo}
            />
          </>
        )}

        {isLoading && <p>Carregando...</p>}
        {isError && <p>Erro ao exibir informações.</p>}
      </div>
    </PageContainer>
  );
}
