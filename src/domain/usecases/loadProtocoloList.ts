export type ILoadProtocoloListArgs = {
  paginaAtual: number;
  itensPagina: number;
  cpfCnpj?: string | null;
  numeroProtocolo?: number | null;
  ano?: number | null;
  tipoDocumento?: number | null;
};

export type ILoadProtocoloListResponseData = {
  id: number;
  numeroProtocolo: string;
  tipoDocumento: number;
  dataSolicitacao: string;
  status: string;
};

export type ILoadProtocoloListResponse = {
  totalPages: number;
  data: ILoadProtocoloListResponseData[];
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
