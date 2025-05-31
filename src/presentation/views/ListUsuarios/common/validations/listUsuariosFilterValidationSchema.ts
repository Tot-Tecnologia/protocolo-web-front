import { z } from "zod";

export type ListUsuariosFilterDto = {
  text?: string | null;
};

export const listUsuariosFilterValidationSchema: z.Schema<ListUsuariosFilterDto> =
  z.object({
    text: z.string().nullish(),
  });

export const listUsuariosFilterDefaultValues: ListUsuariosFilterDto = {
  text: null,
};
