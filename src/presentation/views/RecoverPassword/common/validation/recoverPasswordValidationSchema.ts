import { PasswordRecoveryArgs } from "@/domain/usecases";
import { z } from "zod";

export type RecoverPasswordDto = PasswordRecoveryArgs;

export const recoverPasswordValidationSchema: z.Schema<RecoverPasswordDto> =
  z.object({
    email: z.string().email(),
  });
