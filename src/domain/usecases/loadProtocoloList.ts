import { IProtocoloModel } from "@/domain/models";

export type ILoadProtocoloListArgs = {
  pagina: number;
  itemsPorPagina: number;
  cpfCnpj?: string | null;
  numeroProtocolo?: number | null;
  ano?: number | null;
  tipoSolicitacao?: number | null;
};

export type ILoadProtocoloListResponse = {
  totalPages: number;
  data: IProtocoloModel[];
};

export interface LoadProtocoloList {
  loadWithFilter: (
    args: ILoadProtocoloListArgs,
  ) => Promise<ILoadProtocoloListResponse>;
}
