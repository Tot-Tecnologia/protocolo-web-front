import { TipoDocumentoModel } from "@/domain/models";

export interface LoadTiposDocumentoList {
  loadAll: (
    token: string, // TODO: remover token daqui
  ) => Promise<TipoDocumentoModel[]>;
}
