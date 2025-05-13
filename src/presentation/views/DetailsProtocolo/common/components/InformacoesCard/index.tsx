import { Card } from "@/presentation/components/Card";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";

type InformacoesCardProps = {
  protocolo: LoadProtocoloDetailsResponse | undefined;
};

export function InformacoesCard({ protocolo }: InformacoesCardProps) {
  if (!protocolo) {
    return null;
  }

  return (
    <Card title="Informações">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row">
          <p>
            <b>Número</b>: {protocolo.numeroProtocolo}
          </p>
          <p>
            <b>Situação</b>: {protocolo.statusTexto}
          </p>
        </div>

        <p>
          <b>Tipo</b>: {protocolo.tipoDocumentoTexto}
        </p>

        <p>
          <b>Órgão responsável</b>: - {/* TODO */}
        </p>

        <p>
          <b>Observação</b>: Sem observações. {/* TODO */}
        </p>
      </div>
    </Card>
  );
}
