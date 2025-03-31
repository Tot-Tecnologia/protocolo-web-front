import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";
import { Input } from "@/presentation/components/Input";
import { PageContainer } from "@/presentation/components/PageContainer";
import { Select } from "@/presentation/components/Select";
import { TextArea } from "@/presentation/components/TextArea";
import { OneLargeOneSmallInputsContainer } from "@/presentation/views/CreateDocumento/OneLargeOneSmallInputsContainer";
import { FormProvider, useForm } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ICriarProcessoDto {
  /** CPF ou CNPJ do solicitante */
  cpfCnpj: string;
  /** Nome do solicitante */
  nomeSolicitante: string;
  /** Tipo do endereço */
  logradouro: string;
  /** Endereço completo */
  endereco: string;
  /** Código de identificação do endereço*/
  numero: string;
  /** Bairro do endereço */
  bairro: string;
  /** CEP do endereço */
  cep: string;
  /** Cidade do endereço */
  cidade: string;
  /** Estado do endereço */
  estado: string;
  /** E-mail do solicitante */
  email: string;
  /** Complemento do endereço */
  complemento: string;
  /** ID do tipo de solicitação */
  tipoSolicitacaoId: number;
  /** Descrição da solicitação */
  descricao: string;
  /** Telefone do solicitante */
  telefone: string;
}

export function CreateDocumento() {
  const form = useForm();

  const { handleSubmit } = form;

  const handleSignUp = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 2));
  });

  return (
    <PageContainer title="Solicitar Documento">
      <FormProvider {...form}>
        <form onSubmit={handleSignUp} className="flex flex-col gap-y-6">
          <Card title="Informações do solicitante">
            <div className="flex flex-wrap gap-y-6">
              <Input
                name="cpfCnpj"
                label="Número CPF/CNPJ"
                containerClassName="w-full"
              />

              <Input
                name="nomeSolicitante"
                label="Nome do solicitante"
                containerClassName="w-full"
              />

              <OneLargeOneSmallInputsContainer>
                <Input name="logradouro" label="Logradouro ???" />
                <Input name="numero" label="Número" />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input name="bairro" label="Nome do bairro" />
                <Input name="cep" label="CEP" placeholder="Ex: 38740-000" />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input name="cidade" label="Cidade" />
                <Input name="estado" label="Estado" />
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
                  name="telefone"
                  label="Telefone"
                  containerClassName="w-full"
                  placeholder="Ex: (34) 99123-4567"
                  type="tel"
                />
              </OneLargeOneSmallInputsContainer>

              <Input
                name="complemento"
                label="Complemento"
                containerClassName="w-full"
                placeholder="Ex: Ap. 201"
              />
            </div>
          </Card>

          <Card title="Solicitação">
            <div className="flex flex-wrap gap-x-5 gap-y-6 *:w-full">
              <Select name="DocumentoTypeId" label="Tipo de solicitação">
                <option value="0">Selecione uma opção</option>
                <option value="1">Lorem ipsum dolor</option>
                <option value="2">Ipsum dolor sit</option>
                <option value="3">Dolor sit amet</option>
              </Select>

              <TextArea
                name="descricao"
                label="Descrição"
                rows={6}
                placeholder="Descreva em detalhes sua solicitação"
              />

              <FileUpload name="arquivos" label="Enviar arquivo" />
            </div>
          </Card>

          <Button type="submit">Enviar</Button>
        </form>
      </FormProvider>
    </PageContainer>
  );
}
