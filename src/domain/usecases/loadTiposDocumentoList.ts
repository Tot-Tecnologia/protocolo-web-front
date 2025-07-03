import { TipoDocumentoModel } from "@/domain/models";

export interface LoadTiposDocumentoList {
  loadAll: () => Promise<TipoDocumentoModel[]>;
}
