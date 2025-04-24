import { IDocumentoModel } from "@/domain/models";

export type ILoadDocumentoListArgs = {
  numeroDocumento?: number;
  ano?: number;
  tipoSolicitacao?: number;
};

export type ILoadDocumentoListResponse = {
  totalPages: number;
  data: IDocumentoModel[];
};

export interface LoadDocumentoList {
  loadWithFilter: (
    args: ILoadDocumentoListArgs,
  ) => Promise<ILoadDocumentoListResponse[]>;
}
