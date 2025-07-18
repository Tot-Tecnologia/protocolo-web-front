import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  consultarCidadaoRequestDefaultValues,
  consultarCidadaoRequestValidationSchema,
  type ConsultarCidadaoRequest,
} from "@/presentation/views/DetailsProtocoloServidor/common/validations/consultarCidadaoRequestValidationSchema";
import { FormProvider } from "react-hook-form";

export function ConsultarCidadaoCard() {
  const form = useFormWithZod({
    schema: consultarCidadaoRequestValidationSchema,
    defaultValues: consultarCidadaoRequestDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <div className="grid gap-4">
        <Input<ConsultarCidadaoRequest>
          name="cpfCnpj"
          label="Consultar CPF/CNPJ"
        />
        <div className="flex justify-end">
          <Button type="submit">Consultar</Button>
        </div>
      </div>
    </FormProvider>
  );
}
