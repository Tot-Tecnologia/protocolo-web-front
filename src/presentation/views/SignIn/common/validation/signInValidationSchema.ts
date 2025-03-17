import { AuthenticationArgs } from "@/domain/usecases";
import { z } from "zod";

export type SignInDto = AuthenticationArgs;

export const signInValidationSchema: z.Schema<SignInDto> = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Obrigatório"),
});
