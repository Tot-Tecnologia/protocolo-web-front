import { FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import {
  AddProtocolo,
  LoadTiposDocumentoList,
  UiNotification,
} from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";
import { Input } from "@/presentation/components/Input";
import { PageContainer } from "@/presentation/components/PageContainer";
import { Select } from "@/presentation/components/Select";
import { TextArea } from "@/presentation/components/TextArea";
import { DETAILS_PROTOCOLO_ROUTE_URL } from "@/presentation/constants/routesUrl";
import { useAccessToken } from "@/presentation/hooks/useAccessToken";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { useTiposDocumentoListQuery } from "@/presentation/queries/useTiposDocumentoListQuery";
import { OneLargeOneSmallInputsContainer } from "@/presentation/views/CreateProtocolo/common/components/OneLargeOneSmallInputsContainer";
import { useAddProtocoloMutation } from "@/presentation/views/CreateProtocolo/common/hooks/useAddProtocoloMutation";
import {
  ProtocoloRequest,
  protocoloRequestDefaultValues,
  protocoloRequestValidationSchema,
} from "@/presentation/views/CreateProtocolo/common/validation/createProtocoloValidationSchema";
import { phoneMask } from "@/presentation/utils/inputMasks";
import { cepMask } from "@/presentation/utils/inputMasks/cepMask";
import { estadosBR } from "@/data/constants/estadosBR";

type CreateProtocoloProps = {
  addProtocolo: AddProtocolo;
  uiNotification: UiNotification;
  loadTiposDocumentoList: LoadTiposDocumentoList;
};

export function CreateProtocolo({
  addProtocolo,
  uiNotification,
  loadTiposDocumentoList,
}: CreateProtocoloProps) {
  const form = useFormWithZod({
    schema: protocoloRequestValidationSchema,
    defaultValues: protocoloRequestDefaultValues,
  });

  const navigate = useNavigate();

  const [token] = useAccessToken();

  const tiposDocumentoListQuery = useTiposDocumentoListQuery({
    loadTiposDocumentoList: loadTiposDocumentoList,
    token: token,
  });

  const addProtocoloMutation = useAddProtocoloMutation({ addProtocolo });

  const handleSubmitForm = form.handleSubmit((args) => {
    addProtocoloMutation.mutate(args, {
      onSuccess: (response) => {
        uiNotification.success(
          `Solicitação realizada com sucesso. Número ${response.numeroProtocolo}.`,
        );
        void navigate({
          to: `${DETAILS_PROTOCOLO_ROUTE_URL}`,
          params: { numeroProtocolo: response.numeroProtocolo },
        });
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
                <Input<ProtocoloRequest> name="logradouro" label="Logradouro" />
                <Input<ProtocoloRequest> name="numero" label="Número" />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest> name="bairro" label="Nome do bairro" />
                <Input<ProtocoloRequest>
                  name="cep"
                  label="CEP"
                  placeholder="Ex: 38740-000"
                  onChange={cepMask}
                />
              </OneLargeOneSmallInputsContainer>

              <OneLargeOneSmallInputsContainer>
                <Input<ProtocoloRequest> name="cidade" label="Cidade" />
                <Select<ProtocoloRequest>
                  name="estado"
                  label="Estado"
                  defaultValue="MG"
                >
                  <option value="">Selecione</option>
                  {estadosBR.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Select>
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
                  label="Celular"
                  containerClassName="w-full"
                  placeholder="Ex: (34) 99123-4567"
                  type="tel"
                  onChange={phoneMask}
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
                valueAsNumber
              >
                <option value="">Selecione uma opção</option>
                {tiposDocumentoListQuery.data?.map((tipoDocumento) => (
                  <option key={tipoDocumento.id} value={tipoDocumento.id}>
                    {tipoDocumento.nome}
                  </option>
                ))}
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
