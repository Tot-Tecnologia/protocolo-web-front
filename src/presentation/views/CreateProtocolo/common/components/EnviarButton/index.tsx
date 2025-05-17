import { useWatch } from "react-hook-form";
import { Button } from "@/presentation/components/Button";
import {
  ProtocoloRequest,
  protocoloRequestValidationSchema,
} from "../../validation/createProtocoloValidationSchema";

export function EnviarButton() {
  const formValues = useWatch<ProtocoloRequest>();

  const { success: isFormValuesValid } =
    protocoloRequestValidationSchema.safeParse(formValues);

  return (
    <span
      title={
        !isFormValuesValid
          ? "Preencha os dados da solicitação corretamente."
          : undefined
      }
      className="w-full"
    >
      <Button type="submit" disabled={!isFormValuesValid} className="w-full">
        Enviar
      </Button>
    </span>
  );
}
