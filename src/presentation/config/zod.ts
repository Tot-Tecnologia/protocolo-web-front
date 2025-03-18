import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  console.log(error); // TODO: remover
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (["undefined", "null"].includes(error.received)) {
        return { message: "Obrigatório" };
      }
      break;

    case z.ZodIssueCode.invalid_string:
      if (error.validation === "email") {
        return { message: "E-mail inválido" };
      }
      if (error.validation === "regex") {
        return { message: "Inválido" };
      }
      break;

    case z.ZodIssueCode.too_small:
      if (error.type === "string") {
        return { message: `Deve conter no mínimo ${error.minimum} caracteres` };
      }
      break;

    case z.ZodIssueCode.too_big:
      if (error.type === "string") {
        return { message: `Deve conter no máximo ${error.maximum} caracteres` };
      }
      break;

    default:
      break;
  }
  return { message: ctx.defaultError };
};

export function setupZodErrorMessageTranslation() {
  z.setErrorMap(customErrorMap);
}
