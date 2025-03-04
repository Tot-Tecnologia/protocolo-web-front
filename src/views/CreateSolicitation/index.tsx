import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { PageContainer } from "@/components/PageContainer";
import { widthDespiteGap } from "@/utils/css/widthDespiteGap";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ICreateSolicitationDto = {
  /** Número CPF/CNPJ */
  cpfCnpj: string;
  /** Nome do solicitante */
  nameOfApplicant: string;
  /** Endereço completo ??? */
  address: string;
  /** Logradouro ??? */
  street: string;
  /** Número do endereço ??? */
  code: string;
  /** Bairro */
  neighbor: string;
  /** CEP */
  zipCode: string;
  /** Cidade */
  city: string;
  /** Estado */
  state: string;
  /** E-mail */
  email: string;
  /** Complemento */
  complement: string;
  /** ID do Tipo de Solicitação */
  solicitationTypeId: number;
  /** Descrição */
  description: string;
};

export function CreateSolicitation() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between pb-10">
        <h1 className="text-xl font-semibold">Solicitar Processo</h1>
        <Button
          variant="outlined"
          size="small"
          className="block md:hidden"
          onClick={() => alert("TODO")}
        >
          Menu
        </Button>
      </div>

      <Card title="Informações do solicitante">
        <div className="flex flex-wrap gap-x-5 gap-y-6 *:w-full">
          <Input name="cpfCnpj" label="Número CPF/CNPJ" />

          <Input name="nameOfApplicant" label="Nome do solicitante" />

          <Input
            name="address"
            label="Logradouro ???"
            containerClassName={`md:!${widthDespiteGap("80%", "6")}`}
          />

          <Input name="code" label="Número" containerClassName="md:!w-20/100" />

          <Input
            name="neighbor"
            label="Nome do bairro"
            containerClassName={`md:!${widthDespiteGap("80%", "6")}`}
          />

          <Input name="zipCode" label="CEP" containerClassName="md:!w-20/100" />

          <Input
            name="city"
            label="Cidade"
            containerClassName={`md:!${widthDespiteGap("80%", "6")}`}
          />

          <Input
            name="state"
            label="Estado"
            containerClassName="md:!w-20/100"
          />

          <Input
            name="email"
            label="E-mail"
            containerClassName={`md:!${widthDespiteGap("80%", "6")}`}
          />

          <Input
            name="???"
            label="Telefone"
            containerClassName="md:!w-20/100"
          />

          <Input name="complement" label="Complemento" />
        </div>
      </Card>
    </PageContainer>
  );
}
