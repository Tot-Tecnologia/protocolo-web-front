import { AddProtocolo, UiNotification } from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";
import { Input } from "@/presentation/components/Input";
import { PageContainer } from "@/presentation/components/PageContainer";
import { Select } from "@/presentation/components/Select";
import { TextArea } from "@/presentation/components/TextArea";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { OneLargeOneSmallInputsContainer } from "@/presentation/views/CreateProtocolo/common/components/OneLargeOneSmallInputsContainer";
import { useAddProtocoloMutation } from "@/presentation/views/CreateProtocolo/common/hooks/useAddProtocoloMutation";
import {
  ProtocoloRequest,
  protocoloRequestDefaultValues,
  protocoloRequestValidationSchema,
} from "@/presentation/views/CreateProtocolo/common/validation/createProtocoloValidationSchema";
import { FormProvider } from "react-hook-form";

type ICreateProtocoloProps = {
  addProtocolo: AddProtocolo;
  uiNotification: UiNotification;
};

export function CreateProtocolo({
  addProtocolo,
  uiNotification,
}: ICreateProtocoloProps) {
  const form = useFormWithZod({
    schema: protocoloRequestValidationSchema,
    defaultValues: protocoloRequestDefaultValues,
  });

  const addProtocoloMutation = useAddProtocoloMutation({ addProtocolo });

  const handleSubmitForm = form.handleSubmit((args) => {
    addProtocoloMutation.mutate(args, {
      onSuccess: (response) => {
        uiNotification.success(
          `Solicitação realizada com sucesso. Número ${response.numero}.`,
        );
        form.reset();
      },
      onError: (error) => uiNotification.error(error.message),
    });
  });

  return (
    <PageContainer title="Solicitar Protocolo">
      <FormProvider {...form}>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-y-6">
          <Card title="Informações do solicitante">
            <div className="flex flex-wrap gap-y-6">
              <Input<ProtocoloRequest>
                name="cpfCnpj"
                label="Número CPF/CNPJ"
                containerClassName="w-full"
              />

              <Input<ProtocoloRequest>
                name="nomeSolicitante"
                label="Nome do solicitante"
                containerClassName="w-full"
              />

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest> name="endereco" label="Endereço" />
                <Input<ProtocoloRequest> name="numero" label="Número" />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest> name="bairro" label="Nome do bairro" />
                <Input<ProtocoloRequest>
                  name="cep"
                  label="CEP"
                  placeholder="Ex: 38740-000"
                />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest> name="cidade" label="Cidade" />
                <Input<ProtocoloRequest> name="estado" label="Estado" />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest>
                  name="email"
                  label="E-mail"
                  containerClassName="w-full"
                  placeholder="exemplo@gmail.com"
                  type="email"
                />
                <Input<ProtocoloRequest>
                  name="telefone"
                  label="Telefone"
                  containerClassName="w-full"
                  placeholder="Ex: (34) 99123-4567"
                  type="tel"
                />
              </OneLargeOneSmallInputsContainer>

              <Input<ProtocoloRequest>
                name="complemento"
                label="Complemento"
                containerClassName="w-full"
                placeholder="Ex: Ap. 201"
              />
            </div>
          </Card>

          <Card title="Solicitação">
            <div className="flex flex-wrap gap-x-5 gap-y-6 *:w-full">
              <Select<ProtocoloRequest>
                name="tipoDocumento"
                label="Tipo de solicitação"
              >
                <option value="">Selecione uma opção</option>
                <option value="1">
                  Emissão de Certidão Negativa de Débitos (CND)
                </option>
                <option value="2">Atualização Cadastral de Imóvel</option>
                <option value="3">
                  Solicitação de Alvará de Funcionamento
                </option>
                <option value="4">Isenção de IPTU</option>
                <option value="5">Protocolo de Recurso Administrativo</option>
              </Select>

              <TextArea<ProtocoloRequest>
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
