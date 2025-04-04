import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { Select } from "@/presentation/components/Select";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";

export function ListDocumentosFilter() {
  const form = useFormWithZod({ schema: z.object({}) });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={() => alert("// TODO")}
        className="grid items-end gap-4 md:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
      >
        <Input name="numeroDocumento" label="Número Documento" />

        <Input name="ano" label="Ano" />

        <Select name="tipoSolicitacao" label="Tipo de Documento">
          <option value=""></option>
          <option value="lorem">Lorem</option>
          <option value="ipsum">Ipsum</option>
        </Select>

        <span className="hidden text-[0px] md:block lg:hidden">
          Essa span só serve para ocupar uma coluna do grid em telas md
        </span>

        <Button className="mt-4 md:mt-0">Consultar</Button>

        <Button variant="outlined">Limpar</Button>
      </form>
    </FormProvider>
  );
}
