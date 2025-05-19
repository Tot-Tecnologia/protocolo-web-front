import { LoadProtocoloListArgs } from "@/domain/usecases";
import { z } from "zod";

export type ListProtocolosFilterDto = Partial<LoadProtocoloListArgs>;

export const listProtocolosFilterValidationSchema: z.Schema<ListProtocolosFilterDto> =
  z.object({
    numeroProtocolo: z.string().nullish(),
    ano: z.coerce.number().nullish(),
    tipoDocumento: z.number().nullish(),
    cpfCnpj: z
      .string()
      .nullish()
      .transform((input) => input?.replace(/\D/g, "")),
  });

export const listProtocolosFilterDefaultValues: ListProtocolosFilterDto = {
  ano: null,
  numeroProtocolo: null,
  tipoDocumento: null,
  cpfCnpj: null,
};
