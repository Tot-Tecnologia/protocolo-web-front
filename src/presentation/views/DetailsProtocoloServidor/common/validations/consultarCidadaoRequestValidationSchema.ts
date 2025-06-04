import { z } from "zod";
import { CPF_CNPJ_REGEXP } from "../../../../constants/regExps";

export type ConsultarCidadaoRequest = {
  cpfCnpj: string;
};

export const consultarCidadaoRequestValidationSchema: z.Schema<ConsultarCidadaoRequest> =
  z.object({
    cpfCnpj: z.string().min(1, "Obrigatório").regex(CPF_CNPJ_REGEXP),
  });

export const consultarCidadaoRequestDefaultValues: ConsultarCidadaoRequest = {
  cpfCnpj: "",
};
