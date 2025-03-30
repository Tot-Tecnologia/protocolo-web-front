import { AddAccountArgs } from "@/domain/usecases/addAccount";
import { CPF_CNPJ_REGEXP } from "@/presentation/constants/regExps";
import { z } from "zod";

export type SignUpDto = AddAccountArgs & {
  confirmacaoEmail: string;
  confirmacaoSenha: string;
};

export const signUpValidationSchema: z.Schema<SignUpDto> = z
  .object({
    cpfCnpj: z
      .string()
      .regex(CPF_CNPJ_REGEXP)
      .transform((input) => input.replace(/\D/g, "")),
    nome: z.string().min(1, "Obrigatório"),
    telefone: z
      .string()
      .regex(/^\d{2}\d{8,9}$/, "Deve conter DDD e 8 ou 9 dígitos")
      .transform((input) => input.replace(/\D/g, "")),
    email: z.string().email(),
    confirmacaoEmail: z.string().email(),
    senha: z.string().min(6),
    confirmacaoSenha: z.string(),
  })
  .refine((data) => data.email === data.confirmacaoEmail, {
    message: "A confirmação do e-mail não bate com o e-mail",
    path: ["confirmacaoEmail"],
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "A confirmação da senha não bate com a senha",
    path: ["confirmacaoSenha"],
  });
