import { z } from "zod";

export type EnviarMensagemCidadaoRequest = {
  mensagem: string;
};

export const enviarMensagemCidadaoRequestValidationSchema: z.Schema<EnviarMensagemCidadaoRequest> =
  z.object({
    mensagem: z.string(),
  });

export const enviarMensagemCidadaoRequestDefaultValues: EnviarMensagemCidadaoRequest =
  {
    mensagem: "",
  };
