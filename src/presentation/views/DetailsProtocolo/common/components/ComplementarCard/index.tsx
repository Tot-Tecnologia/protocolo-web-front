import { FieldErrors, FormProvider } from "react-hook-form";
import {
  AddDocumentosToProtocolo,
  LoadProtocoloDetailsResponse,
  UiNotification,
} from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";
import { Card } from "@/presentation/components/Card";
import { FileUpload } from "@/presentation/components/FileUpload";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { useAddDocumentosToProtocoloMutation } from "../../hooks/useAddDocumentosToProtocoloMutation";
import {
  ArquivoRequest,
  arquivoRequestDefaultValues,
  arquivoRequestValidationSchema,
} from "../../validations/arquivoRequestValidationSchema";

type ComplementarCardProps = {
  addDocumentosToProtocolo: AddDocumentosToProtocolo;
  protocolo: LoadProtocoloDetailsResponse | undefined;
  uiNotification: UiNotification;
  label?: string;
};

export function ComplementarCard({
  label = "Enviar arquivo",
  addDocumentosToProtocolo,
  protocolo,
  uiNotification,
}: ComplementarCardProps) {
  const idProtocolo = protocolo!.id;

  const addDocumentosToProtocoloMutation = useAddDocumentosToProtocoloMutation({
    addDocumentosToProtocolo: addDocumentosToProtocolo,
  });

  const addDocumentosForm = useFormWithZod({
    schema: arquivoRequestValidationSchema,
    defaultValues: arquivoRequestDefaultValues,
  });

  const handleValidSubmission = ({ documentos }: ArquivoRequest) =>
    addDocumentosToProtocoloMutation.mutate(
      { idProtocolo: idProtocolo, documentos: documentos },
      {
        onSuccess: () => {
          uiNotification.success("Documento(s) adicionado(s) com sucesso.");
          addDocumentosForm.reset();
        },
        onError: (error) => uiNotification.error(error.message),
      },
    );

  const handleInvalidSubmission = (errors: FieldErrors<ArquivoRequest>) => {
    if (errors.documentos?.message?.length) {
      uiNotification.error(errors.documentos?.message);
    }
    if (errors.documentos?.length && errors.documentos.find) {
      const firstError = errors.documentos.find(
        (error) => error?.message?.length,
      );
      uiNotification.error(firstError?.message);
    }
  };

  const handleSubmitForm = addDocumentosForm.handleSubmit(
    handleValidSubmission,
    handleInvalidSubmission,
  );

  return (
    <Card title="Complementar solicitação">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmitForm}>
        <FormProvider {...addDocumentosForm}>
          <FileUpload name="documentos" label={label} />
          <Button
            className="mt-5"
            type="submit"
            loading={addDocumentosToProtocoloMutation.isPending}
          >
            Anexar novo arquivo
          </Button>
        </FormProvider>
      </form>
    </Card>
  );
}
