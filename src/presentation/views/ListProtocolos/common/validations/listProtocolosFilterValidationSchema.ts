import { LoadProtocoloListArgs } from "@/domain/usecases";
import { z } from "zod";

export type ListProtocolosFilterDto = Partial<LoadProtocoloListArgs>;

export const listProtocolosFilterValidationSchema: z.Schema<ListProtocolosFilterDto> =
  z.object({
    numeroProtocolo: z.string().nullish(),
    ano: z.coerce.number().nullish(),
    tipoDocumento: z.number().nullish(),
  });

export const listProtocolosFilterDefaultValues: ListProtocolosFilterDto = {
  ano: null,
  numeroProtocolo: null,
  tipoDocumento: null,
};
