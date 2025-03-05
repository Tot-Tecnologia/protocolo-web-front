import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/Input";
import { PageContainer } from "@/components/PageContainer";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { OneLargeOneSmallInputsContainer } from "@/views/CreateSolicitation/OneLargeOneSmallInputsContainer";

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
    <PageContainer title="Solicitar Processo">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          alert(JSON.stringify(Object.fromEntries(data), null, 2));
        }}
        className="flex flex-col gap-y-6"
      >
        <Card title="Informações do solicitante">
          <div className="flex flex-wrap gap-y-6">
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

            <OneLargeOneSmallInputsContainer>
              <Input name="address" label="Logradouro ???" />
              <Input name="code" label="Número" />
            </OneLargeOneSmallInputsContainer>

            <OneLargeOneSmallInputsContainer>
              <Input name="neighbor" label="Nome do bairro" />
              <Input name="zipCode" label="CEP" placeholder="Ex: 38740-000" />
            </OneLargeOneSmallInputsContainer>

            <OneLargeOneSmallInputsContainer>
              <Input name="city" label="Cidade" />
              <Input name="state" label="Estado" />
            </OneLargeOneSmallInputsContainer>

            <OneLargeOneSmallInputsContainer>
              <Input
                name="email"
                label="E-mail"
                containerClassName="w-full"
                placeholder="exemplo@gmail.com"
                type="email"
              />
              <Input
                name="???"
                label="Telefone"
                containerClassName="w-full"
                placeholder="Ex: (34) 99123-4567"
                type="tel"
              />
            </OneLargeOneSmallInputsContainer>

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
