import { ProtocoloWebPaginationResponse } from "@/domain/models";

export type LoadProtocoloListArgs = {
  paginaAtual: number;
  itensPagina: number;
  cpfCnpj?: string | null;
  numeroProtocolo?: number | null;
  ano?: number | null;
  tipoDocumento?: number | null;
};

export type LoadProtocoloListResponseData = {
  id: number;
  numeroProtocolo: string;
  tipoDocumento: number;
  dataSolicitacao: string;
  status: string;
};

export type LoadProtocoloListResponse =
  ProtocoloWebPaginationResponse<LoadProtocoloListResponseData>;

export interface LoadProtocoloList {
  loadWithFilter: (
    args: LoadProtocoloListArgs,
    token: string, // TODO: remover token daqui
  ) => Promise<LoadProtocoloListResponse>;
}
