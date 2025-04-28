import { Card } from "@/presentation/components/Card";

export function InformacoesCard() {
  return (
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
          <b>Observação</b>: Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Culpa facilis, adipisci nam a eveniet illum.
        </p>
      </div>
    </Card>
  );
}
