import { CPF_CNPJ_REGEXP } from "@/presentation/constants/regExps";
import { z } from "zod";

// TODO: completar
export const signUpValidationSchema = z.object({
  cpfCnpj: z.string().regex(CPF_CNPJ_REGEXP),
  nome: z.unknown(),
  telefone: z.unknown(),
  email: z.unknown(),
  confirmacaoEmail: z.unknown(),
  senha: z.unknown(),
  confirmacaoSenha: z.unknown(),
});

export type SignUpDto = z.infer<typeof signUpValidationSchema>;
