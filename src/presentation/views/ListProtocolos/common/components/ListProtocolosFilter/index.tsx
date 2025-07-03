import { FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { Select } from "@/presentation/components/Select";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  changeCpfCnpjEventHandler,
  onlyDigitsHandler,
} from "@/presentation/utils/inputMasks";
import { LIST_PROTOCOLOS_ROUTE_URL } from "@/presentation/constants/routesUrl";
import {
  listProtocolosFilterDefaultValues,
  ListProtocolosFilterDto,
  listProtocolosFilterValidationSchema,
} from "../../validations/listProtocolosFilterValidationSchema";
import { useEffect } from "react";
import { removeNullish } from "@/presentation/utils/objectUtils/removeNullish";
import { useTiposDocumentoListQuery } from "@/presentation/queries/useTiposDocumentoListQuery";
import { LoadTiposDocumentoList } from "@/domain/usecases";

type ListProtocolosFilterProps = {
  loadTiposDocumentoList: LoadTiposDocumentoList;
};

export function ListProtocolosFilter({
  loadTiposDocumentoList,
}: ListProtocolosFilterProps) {
  const form = useFormWithZod({
    schema: listProtocolosFilterValidationSchema,
    defaultValues: listProtocolosFilterDefaultValues,
  });

  const { setValue, getValues } = form;

  const numeroProtocolo = useWatch({
    control: form.control,
    name: "numeroProtocolo",
  });

  const isNumeroProtocoloFilled =
    numeroProtocolo != null && numeroProtocolo.toString().length > 0;

  const tiposDocumentoListQuery = useTiposDocumentoListQuery({
    loadTiposDocumentoList: loadTiposDocumentoList,
  });

  const navigate = useNavigate({ from: LIST_PROTOCOLOS_ROUTE_URL });

  const handleSubmitForm = form.handleSubmit((filter) => {
    void navigate({
      search: () => ({
        paginaAtual: 0,
        ...removeNullish(filter),
      }),
      replace: true,
    });
  });

  useEffect(() => {
    if (isNumeroProtocoloFilled) {
      const ano = getValues("ano");
      const tipoDocumento = getValues("tipoDocumento");
      const cpfCnpj = getValues("cpfCnpj");
      if (ano != null && ano.toString().length > 0) {
        setValue("ano", null);
      }
      if (tipoDocumento != null && tipoDocumento.toString().length > 0) {
        setValue("tipoDocumento", null);
      }
      if (cpfCnpj != null && cpfCnpj.toString().length > 0) {
        setValue("cpfCnpj", null);
      }
    }
  }, [getValues, isNumeroProtocoloFilled, setValue]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmitForm}
        className="grid items-end gap-4 md:grid-cols-3 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.3fr)_minmax(0,0.6fr)_minmax(0,1fr)_auto_auto]"
      >
        <Input<ListProtocolosFilterDto>
          name="numeroProtocolo"
          label="Número Protocolo"
        />

        <Input<ListProtocolosFilterDto>
          name="ano"
          label="Ano"
          onChange={onlyDigitsHandler}
          disabled={isNumeroProtocoloFilled}
        />

        <Input<ListProtocolosFilterDto>
          name="cpfCnpj"
          label="CPF/CNPJ"
          onChange={changeCpfCnpjEventHandler}
          disabled={isNumeroProtocoloFilled}
        />

        <Select<ListProtocolosFilterDto>
          name="tipoDocumento"
          label="Tipo de solicitação"
          disabled={isNumeroProtocoloFilled}
          valueAsNumber
        >
          <option value=""></option>
          {tiposDocumentoListQuery.data?.map((tipoDocumento) => (
            <option key={tipoDocumento.id} value={tipoDocumento.id}>
              {tipoDocumento.nome}
            </option>
          ))}
        </Select>

        <span className="hidden text-[0px] md:block lg:hidden">
          Essa span só serve para ocupar uma coluna do grid em telas md
        </span>

        <Button className="mt-4 md:mt-0" type="submit">
          Consultar
        </Button>

        <Button variant="outlined" onClick={() => form.reset()}>
          Limpar
        </Button>
      </form>
    </FormProvider>
  );
}
