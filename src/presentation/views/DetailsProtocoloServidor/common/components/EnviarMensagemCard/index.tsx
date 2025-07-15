import { FormProvider } from "react-hook-form";
import { Button } from "@/presentation/components/Button";
import { TextArea } from "@/presentation/components/TextArea";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import {
  enviarMensagemCidadaoRequestDefaultValues,
  enviarMensagemCidadaoRequestValidationSchema,
  type EnviarMensagemCidadaoRequest,
} from "@/presentation/views/DetailsProtocoloServidor/common/validations/enviarMensagemCidadaoRequestValidationSchema";

export function EnviarMensagemCard() {
  const form = useFormWithZod({
    schema: enviarMensagemCidadaoRequestValidationSchema,
    defaultValues: enviarMensagemCidadaoRequestDefaultValues,
  });

  return (
    <FormProvider {...form}>
      <div className="grid gap-4">
        <TextArea<EnviarMensagemCidadaoRequest>
          name="mensagem"
          label="Enviar mensagem para solicitante"
          rows={6}
        />

        <div className="flex justify-end">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </FormProvider>
  );
}
