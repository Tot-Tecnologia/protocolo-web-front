import { useWatch } from "react-hook-form";
import { Button } from "@/presentation/components/Button";
import {
  ProtocoloRequest,
  protocoloRequestValidationSchema,
} from "../../validation/createProtocoloValidationSchema";

type EnviarButtonProps = {
  loading: boolean;
};

export function EnviarButton({ loading }: EnviarButtonProps) {
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
      <Button
        className="w-full"
        type="submit"
        disabled={!isFormValuesValid}
        loading={loading}
      >
        Enviar
      </Button>
    </span>
  );
}
