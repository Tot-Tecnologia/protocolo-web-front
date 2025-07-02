import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  listUsuariosFilterDefaultValues,
  listUsuariosFilterValidationSchema,
  type ListUsuariosFilterDto,
} from "@/presentation/views/ListUsuarios/common/validations/listUsuariosFilterValidationSchema";
import { FormProvider } from "react-hook-form";

export function ListUsuariosFilter() {
  const form = useFormWithZod({
    schema: listUsuariosFilterValidationSchema,
    defaultValues: listUsuariosFilterDefaultValues,
  });

  return (
    <>
      <FormProvider {...form}>
        <form className="grid items-end sm:grid-cols-[3fr_1fr_1fr] sm:gap-4 md:grid-cols-[2fr_1fr_1fr] md:gap-4 lg:grid-cols-[3fr_1fr_1fr] lg:gap-12">
          <Input<ListUsuariosFilterDto> label="Nome" name="text" />

          <Button className="mt-4 md:mt-0" type="submit">
            Consultar
          </Button>

          <Button
            className="mt-4 md:mt-0"
            variant="outlined"
            onClick={() => form.reset()}
          >
            Limpar
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
