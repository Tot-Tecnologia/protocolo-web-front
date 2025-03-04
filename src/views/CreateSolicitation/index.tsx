import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/Input";
import { PageContainer } from "@/components/PageContainer";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
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

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          alert(JSON.stringify(Object.fromEntries(data), null, 2));
        }}
        className="flex flex-col gap-y-6"
      >
        <Card title="Informações do solicitante">
          <div className="flex flex-wrap gap-x-5 gap-y-6">
            <Input
              name="cpfCnpj"
              label="Número CPF/CNPJ"
              containerClassName="w-full"
            />

            <Input
              name="nameOfApplicant"
              label="Nome do solicitante"
              containerClassName="w-full"
            />

            <Input
              name="address"
              label="Logradouro ???"
              containerClassName={`w-full md:${widthDespiteGap("80%", "5")}`}
            />

            <Input
              name="code"
              label="Número"
              containerClassName="w-full md:w-20/100"
            />

            <Input
              name="neighbor"
              label="Nome do bairro"
              containerClassName={`w-full md:${widthDespiteGap("80%", "5")}`}
            />

            <Input
              name="zipCode"
              label="CEP"
              containerClassName="w-full md:w-20/100"
              placeholder="Ex: 38740-000"
            />

            <Input
              name="city"
              label="Cidade"
              containerClassName={`w-full md:${widthDespiteGap("80%", "5")}`}
            />

            <Input
              name="state"
              label="Estado"
              containerClassName="w-full md:w-20/100"
            />

            <Input
              name="email"
              label="E-mail"
              containerClassName={`w-full md:${widthDespiteGap("80%", "5")}`}
              placeholder="exemplo@gmail.com"
              type="email"
            />

            <Input
              name="???"
              label="Telefone"
              containerClassName="w-full md:w-20/100"
              placeholder="Ex: (34) 99123-4567"
              type="tel"
            />

            <Input
              name="complement"
              label="Complemento"
              containerClassName="w-full"
              placeholder="Ex: Ap. 201"
            />
          </div>
        </Card>

        <Card title="Solicitação">
          <div className="flex flex-wrap gap-x-5 gap-y-6 *:w-full">
            <Select name="solicitationTypeId" label="Tipo de solicitação">
              <option value="0">Selecione uma opção</option>
              <option value="1">Lorem ipsum dolor</option>
              <option value="2">Ipsum dolor sit</option>
              <option value="3">Dolor sit amet</option>
            </Select>

            <TextArea
              name="description"
              label="Descrição"
              rows={6}
              placeholder="Descreva em detalhes sua solicitação"
            />

            <FileUpload name="file" label="Enviar arquivo" />
          </div>
        </Card>

        <Button type="submit">Enviar</Button>
      </form>
    </PageContainer>
  );
}
