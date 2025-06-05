import { Card } from "@/presentation/components/Card";
import { LoadProtocoloDetailsResponse } from "@/domain/usecases";
import { ProtocoloStatusEnumDescription } from "@/data/constants/protocoloStatusEnum";

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
        <div
          className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-x-10 
        gap-y-4
      "
        >
          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Nome solicitante
            </span>
            {protocolo.nomeSolicitante}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              CPF/CNPJ
            </span>
            {protocolo.cpfCnpj}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Endereço
            </span>
            {`${protocolo.logradouro}, ${protocolo.bairro}, Número ${protocolo.numero}`}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Cidade
            </span>
            {`${protocolo.cidade} - ${protocolo.estado}`}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              CEP
            </span>
            {protocolo.cep}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Número
            </span>
            {protocolo.numeroProtocolo}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Situação
            </span>
            {ProtocoloStatusEnumDescription[protocolo.status]}
          </div>

          <div>
            <span className="block font-semibold text-sm text-slate-800">
              Tipo
            </span>
            {protocolo.tipoDocumentoTexto}
          </div>

          <div className="col-span-full">
            <span className="block font-semibold text-sm text-slate-800">
              Descrição
            </span>
            {protocolo.descricao.length ? protocolo.descricao : "Sem observações."}
          </div>
        </div>
      </div>
    </Card>
  );
}
