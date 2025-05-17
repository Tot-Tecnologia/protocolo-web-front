import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";

export function ComplementarCard() {
  const form = useFormWithZod({
    schema: z.object({
      documentos: z.array(z.any()),
    }),
  });

  return (
    <Card title="Complementar solicitação">
      <form className="flex flex-col gap-y-4">
        <FormProvider {...form}>
          <FileUpload name="#TODO" label="Enviar arquivo" />
          <Button className="mt-5" onClick={() => alert("TODO")}>
            Anexar novo arquivo
          </Button>
        </FormProvider>
      </form>
    </Card>
  );
}
