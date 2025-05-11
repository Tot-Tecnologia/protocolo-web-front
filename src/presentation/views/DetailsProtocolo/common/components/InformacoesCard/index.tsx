import { Card } from "@/presentation/components/Card";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";

type IInformacoesCardProps = {
  protocolo: LoadProtocoloDetailsResponse | undefined;
};

export function InformacoesCard({ protocolo }: IInformacoesCardProps) {
  if (!protocolo) {
    return null;
  }

  return (
    <Card title="Informações">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
          <p>
            <b>Número</b>: #TODO
          </p>
          <p>
            <b>Situação</b>: {protocolo.status} #TODO
          </p>
        </div>

        <p>
          <b>Tipo</b>: {protocolo.tipoDocumento} #TODO
        </p>

        <p>
          <b>Órgão responsável</b>: #TODO
        </p>

        <p>
          <b>Observação</b>: Sem observações. #TODO
        </p>
      </div>
    </Card>
  );
}
