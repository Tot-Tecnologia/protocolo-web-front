import { FormProvider } from "react-hook-form";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { Select } from "@/presentation/components/Select";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { onlyDigitsHandler } from "@/presentation/utils/inputMasks";
import {
  listProtocolosFilterDefaultValues,
  ListProtocolosFilterDto,
  listProtocolosFilterValidationSchema,
} from "../../validations/listProtocolosFilterValidationSchema";

export function ListProtocolosFilter() {
  const form = useFormWithZod({
    schema: listProtocolosFilterValidationSchema,
    defaultValues: listProtocolosFilterDefaultValues,
  });

  // TODO: adicionar uma maneira de obter a página selecionada atualmente
  const handleSubmitForm = form.handleSubmit(
    (data) => alert(JSON.stringify(data, null, 2)), // TODO: tratar sucesso
    (errors) => alert(JSON.stringify(errors, null, 2)), // TODO: tratar erro
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmitForm}
        className="grid items-end gap-4 md:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
      >
        <Input<ListProtocolosFilterDto>
          name="numeroProtocolo"
          label="Número Protocolo"
          onChange={onlyDigitsHandler}
        />

        <Input<ListProtocolosFilterDto>
          name="ano"
          label="Ano"
          onChange={onlyDigitsHandler}
        />

        <Select name="tipoSolicitacao" label="Tipo de solicitação">
          <option value=""></option>
          <option value="lorem">Lorem</option>
          <option value="ipsum">Ipsum</option>
        </Select>

        <span className="hidden text-[0px] md:block lg:hidden">
          Essa span só serve para ocupar uma coluna do grid em telas md
        </span>

        <Button className="mt-4 md:mt-0" type="submit">
          Consultar
        </Button>

        <Button variant="outlined">Limpar</Button>
      </form>
    </FormProvider>
  );
}
