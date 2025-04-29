import { IProtocoloModel } from "@/domain/models";

export type ILoadProtocoloListArgs = {
  pagina: number;
  itemsPorPagina: number;
  cpfCnpj?: string;
  numeroProtocolo?: number;
  ano?: number;
  tipoSolicitacao?: number;
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
