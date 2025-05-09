import { IProtocoloModel } from "@/domain/models";

export type ILoadProtocoloListArgs = {
  paginaAtual: number;
  itensPagina: number;
  cpfCnpj?: string | null;
  numeroProtocolo?: number | null;
  ano?: number | null;
  tipoDocumento?: number | null;
};

export type ILoadProtocoloListResponse = {
  totalPages: number;
  data: IProtocoloModel[];
  paginaAtual: number;
  itensPagina: number;
  totalItems: number;
};

export interface LoadProtocoloList {
  loadWithFilter: (
    args: ILoadProtocoloListArgs,
    token: string, // TODO: remover token daqui
  ) => Promise<ILoadProtocoloListResponse>;
}
