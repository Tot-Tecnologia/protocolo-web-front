import { Card } from "@/presentation/components/Card";
import { PageContainer } from "@/presentation/components/PageContainer";
import { LIST_DOCUMENTOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { HistoricoAtualizacoesTable } from "@/presentation/views/DetailsDocumento/common/HistoricoAtualizacoesTable";

export function DetailsDocumento() {
  return (
    <PageContainer
      navigateBackwardTo={LIST_DOCUMENTOS_ROUTE_URL}
      title="Consultar solicitação"
    >
      <div className="space-y-10">
        <Card title="Informações">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
              <p>
                <b>Número</b>: 0138
              </p>

              <p>
                <b>Situação</b>: Aguardando pagamento de guia
              </p>
            </div>

            <p>
              <b>Tipo</b>: Alteração cadastral
            </p>

            <p>
              <b>Órgão responsável</b>: Secretaria de Finanças
            </p>

            <p>
              <b>Observação</b>: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Culpa facilis, adipisci nam a eveniet illum.
            </p>
          </div>
        </Card>

        <HistoricoAtualizacoesTable />
      </div>
    </PageContainer>
  );
}
