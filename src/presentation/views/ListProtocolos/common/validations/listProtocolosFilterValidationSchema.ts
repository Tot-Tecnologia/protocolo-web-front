import { LoadProtocoloListArgs } from "@/domain/usecases";
import { z } from "zod";

export type ListProtocolosFilterDto = Partial<LoadProtocoloListArgs>;

export const listProtocolosFilterValidationSchema: z.Schema<ListProtocolosFilterDto> =
  z.object({
    numeroProtocolo: z.coerce.number().nullish(),
    ano: z.coerce.number().nullish(),
    tipoSolicitacao: z.coerce.number().nullish(),
  });

export const listProtocolosFilterDefaultValues: ListProtocolosFilterDto = {
  ano: null,
  numeroProtocolo: null,
  tipoDocumento: null,
};
